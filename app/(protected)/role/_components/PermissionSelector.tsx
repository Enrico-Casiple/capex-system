'use client';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Permission } from '@/lib/generated/api/customHookAPI/graphql';
import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { DebouncedInput } from '@/components/custom/DebouncedInput';
import { Search, Shield } from 'lucide-react';

type PermissionSelectorProps = {
  permissions: Permission[];
  selectedIds: string[];
  setSelectedPermissions: React.Dispatch<React.SetStateAction<string[]>>;
  isViewMode: boolean;
};

const PermissionSelector = ({
  permissions,
  selectedIds,
  setSelectedPermissions,
  isViewMode,
}: PermissionSelectorProps) => {
  const [search, setSearch] = useState('');
  const [manualOpen, setManualOpen] = useState<string[]>([]);

  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {};
    permissions.forEach((perm) => {
      const key = perm.module ?? 'OTHER';
      if (!groups[key]) groups[key] = [];
      groups[key].push(perm);
    });
    return groups;
  }, [permissions]);

  const allModules = useMemo(() => Object.keys(groupedPermissions), [groupedPermissions]);

  const filteredModules = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allModules;

    return allModules.filter((module) =>
      groupedPermissions[module].some(
        (perm) =>
          (perm.name ?? '').toLowerCase().includes(q) ||
          (perm.description ?? '').toLowerCase().includes(q),
      ),
    );
  }, [search, allModules, groupedPermissions]);

  const openModules = useMemo(
    () => (search.trim() ? filteredModules : manualOpen),
    [search, filteredModules, manualOpen],
  );

  const allSelected = permissions.length > 0 && selectedIds.length === permissions.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className="space-y-4 rounded-xl border bg-background p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Shield className="h-4 w-4" />
        Permissions
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Checkbox
              id="select-all"
              checked={allSelected ? true : someSelected ? 'indeterminate' : false}
              disabled={isViewMode || permissions.length === 0}
              onCheckedChange={(checked) => {
                setSelectedPermissions(checked ? permissions.map((p) => p.id) : []);
              }}
            />
          </div>

          <Label htmlFor="select-all" className="cursor-pointer text-sm font-medium">
            Select all permissions
          </Label>
        </div>

        <Badge variant="outline" className="text-xs">
          {selectedIds.length}/{permissions.length}
        </Badge>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <DebouncedInput
          placeholder="Search permissions..."
          value={search}
          onChange={(val) => setSearch(String(val))}
          className="bg-background pl-9 placeholder:text-muted-foreground"
        />
      </div>

      {!filteredModules.length ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No permissions found.
        </div>
      ) : (
        <Accordion
          type="multiple"
          value={openModules}
          onValueChange={(val) => {
            if (!search.trim()) setManualOpen(val);
          }}
          className="space-y-3"
        >
          {filteredModules.map((module) => {
            const modulePerms = groupedPermissions[module].filter((perm) => {
              const q = search.trim().toLowerCase();
              if (!q) return true;
              return (
                (perm.name ?? '').toLowerCase().includes(q) ||
                (perm.description ?? '').toLowerCase().includes(q)
              );
            });

            const selectedCount = groupedPermissions[module].filter((p) =>
              selectedIds.includes(p.id),
            ).length;
            const moduleAllSelected = selectedCount === groupedPermissions[module].length;
            const moduleSomeSelected = selectedCount > 0 && !moduleAllSelected;

            return (
              <AccordionItem
                key={module}
                value={module}
                className="overflow-hidden rounded-lg border bg-card"
              >
                <AccordionTrigger className="rounded-lg bg-muted/30 px-4 py-4 hover:no-underline hover:bg-muted/50">
                  <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          id={`select-all-${module}`}
                          checked={
                            moduleAllSelected ? true : moduleSomeSelected ? 'indeterminate' : false
                          }
                          disabled={isViewMode}
                          onCheckedChange={(checked) => {
                            const modulePermIds = groupedPermissions[module].map((p) => p.id);

                            setSelectedPermissions((prev) => {
                              if (checked) {
                                return Array.from(new Set([...prev, ...modulePermIds]));
                              }
                              return prev.filter((id) => !modulePermIds.includes(id));
                            });
                          }}
                        />
                      </div>

                      <div className="text-left">
                        <div className="text-xs font-bold uppercase tracking-wider">
                          {module.replace(/_/g, ' ')}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {groupedPermissions[module].length} permissions
                        </div>
                      </div>
                    </div>

                    <Badge
                      variant={
                        moduleAllSelected
                          ? 'default'
                          : moduleSomeSelected
                            ? 'secondary'
                            : 'outline'
                      }
                      className="text-[10px]"
                    >
                      {selectedCount}/{groupedPermissions[module].length}
                    </Badge>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {modulePerms.map((perm) => {
                      const isChecked = selectedIds.includes(perm.id);

                      return (
                        <div
                          key={perm.id}
                          className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${isChecked ? 'border-primary/30 bg-primary/5' : 'hover:bg-muted/40'
                            }`}
                        >
                          <div
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              id={`perm-${perm.id}`}
                              checked={isChecked}
                              disabled={isViewMode}
                              onCheckedChange={(checked) =>
                                setSelectedPermissions((prev) =>
                                  checked
                                    ? Array.from(new Set([...prev, perm.id]))
                                    : prev.filter((id) => id !== perm.id),
                                )
                              }
                              className="mt-0.5 shrink-0"
                            />
                          </div>

                          <Label
                            htmlFor={`perm-${perm.id}`}
                            className="min-w-0 flex-1 cursor-pointer space-y-1"
                          >
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-sm font-medium leading-none">
                                {perm.name ?? ''}
                              </span>
                              {perm.isGlobal && (
                                <Badge variant="outline" className="text-[9px]">
                                  Global
                                </Badge>
                              )}
                              {perm.isAdmin && (
                                <Badge variant="destructive" className="text-[9px]">
                                  Admin
                                </Badge>
                              )}
                            </div>

                            {perm.description && (
                              <p className="line-clamp-2 text-xs text-muted-foreground">
                                {perm.description}
                              </p>
                            )}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default PermissionSelector;