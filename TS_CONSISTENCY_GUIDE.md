# TypeScript Consistency + Performance Guide

This guide keeps type safety high while avoiding IntelliSense freezes and TS server shutdowns.

## Core Rules

1. Keep component-level form contracts small.
2. Avoid passing huge generated types (like full GraphQL model trees) into `UseFormReturn<T>` in UI components.
3. Use local typed field maps for form paths used by a component.
4. Keep generated files out of active TS indexing where possible.
5. Split dev scripts into `fast` and `full` modes.

## Pattern For React Hook Form In Heavy Modules

Use this pattern in sections/forms with many nested paths:

```ts
// 1) Define only fields used by this section
type FieldMap = {
  'requestedCRF.budgetId': string;
  'requestedCRF.requestedAmount': number;
};

type FieldName = keyof FieldMap;

// 2) Accept a broad form object from parent (keeps compatibility)
form: UseFormReturn<Record<string, unknown>>;

// 3) Add typed helpers locally
const getField = <K extends FieldName>(name: K): FieldMap[K] => form.watch(name) as FieldMap[K];

const setField = <K extends FieldName>(name: K, value: FieldMap[K]) =>
  (form.setValue as (field: string, fieldValue: unknown) => void)(name, value);
```

Why this works:

- You keep strong typing for used paths.
- You avoid deep generic expansion from very large root types.
- IntelliSense remains responsive.

## Stable Hook Dependencies

Do not put complex expressions directly in dependency arrays.

Use:

```ts
const watchedBudgetId = getField('requestedCRF.budgetId');
React.useEffect(() => {
  // use watchedBudgetId
}, [watchedBudgetId]);
```

Avoid:

```ts
React.useEffect(() => {}, [form.watch('requestedCRF.budgetId')]);
```

## tsconfig.json Baseline (Fast + Safe)

- Keep:
  - `"incremental": true`
  - `"tsBuildInfoFile": ".tsbuildinfo"`
  - `"skipLibCheck": true`
- Avoid including volatile folders in `include`:
  - Do not add `.next/types/**/*.ts` manually unless needed.
- Keep generated folders excluded:
  - `generated`
  - `lib/generated`

## VS Code Workspace Settings

In `.vscode/settings.json`:

- Use workspace TypeScript SDK:
  - `"js/ts.tsdk.path": "node_modules/typescript/lib"`
- Increase TS memory if needed:
  - `"js/ts.tsserver.maxMemory": 4096`
- Exclude heavy folders from watchers/search:
  - `.next`, `node_modules`, `generated`, `lib/generated`, `dist`, `build`

## Recommended Scripts

- Fast daily coding:
  - `npm run dev:windows:fast`
- Full stack with heavy watchers/tools:
  - `npm run server:full`

Use fast mode by default, full mode only when you actually need codegen watch or studio.

## Team Consistency Rules

1. Every form section defines its own `FieldMap` for paths it touches.
2. No `UseFormReturn<MassiveGeneratedType>` in leaf UI sections.
3. Watch only what you need; keep effect dependencies primitive or precomputed.
4. Keep generated code excluded from TS project where possible.
5. Add performance-safe defaults to new modules from the start.

## Recovery Steps If IntelliSense Freezes

1. `TypeScript: Restart TS Server`
2. `Developer: Reload Window`
3. Stop heavy watchers and rerun fast mode:
   - `npm run dev:windows:fast`
4. If still slow, run `npm run type-check` and fix top-level type explosions first.

## Quick Checklist Before PR

- [ ] No deep generic type explosion in component props
- [ ] No complex expressions in `useEffect` dependency arrays
- [ ] Generated folders still excluded
- [ ] Fast script still available and working
