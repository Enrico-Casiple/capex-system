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

type PermissionSelectorProps = {
  permissions: Permission[];
  selectedIds: string[];
  setSelectedPermissions: React.Dispatch<React.SetStateAction<string[]>>;
};

const PermissionSelector = ({
  permissions,
  selectedIds,
  setSelectedPermissions,
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

  const filteredModules = useMemo(
    () =>
      allModules.filter((module) =>
        groupedPermissions[module].some(
          (perm) =>
            (perm.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
            (perm.description ?? '').toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    [search, allModules, groupedPermissions],
  );

  // When searching, open all matching modules; otherwise use manual state
  const openModules = useMemo(
    () => (search ? filteredModules : manualOpen),
    [search, filteredModules, manualOpen],
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Select all */}

      <div className="flex items-center gap-2 ml-1 py-3 border-b border-border">
        <Checkbox
          id="select-all"
          checked={selectedIds.length === permissions.length}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedPermissions(permissions.map((p) => p.id));
            } else {
              setSelectedPermissions([]);
            }
          }}
        />
        <Label htmlFor="select-all" className="text-sm cursor-pointer">
          Select All Permissions
        </Label>
      </div>

      {/* Search */}
      <DebouncedInput
        placeholder="Search permissions..."
        value={search}
        onChange={(val) => setSearch(String(val))}
        className="bg-background placeholder:text-muted-foreground"
      />
      {/* Choices */}
      <Accordion
        type="multiple"
        value={openModules}
        onValueChange={(val) => {
          if (!search) setManualOpen(val);
        }}
      >
        {filteredModules.map((module) => {
          const modulePerms = groupedPermissions[module].filter(
            (perm) =>
              (perm.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
              (perm.description ?? '').toLowerCase().includes(search.toLowerCase()),
          );
          const selectedCount = groupedPermissions[module].filter((p) =>
            selectedIds.includes(p.id),
          ).length;
          const allSelected = selectedCount === groupedPermissions[module].length;

          return (
            <AccordionItem
              key={module}
              value={module}
              className="border border-border rounded-lg mb-2 overflow-hidden"
            >
              <div className="flex items-center hover:bg-muted/50 cursor-pointer bg-muted/20 [&_[data-slot=accordion-trigger-icon]]:hidden [&_[data-slot=accordion-trigger-icon]]:group-aria-expanded:hidden">
                <Checkbox
                  id={`select-all-${module}`}
                  checked={allSelected}
                  onCheckedChange={(checked) => {
                    setSelectedPermissions((prev) => {
                      const modulePermIds = groupedPermissions[module].map((p) => p.id);
                      if (checked) {
                        // Add all permissions from this module
                        return Array.from(new Set([...prev, ...modulePermIds]));
                      } else {
                        // Remove all permissions from this module
                        return prev.filter((id) => !modulePermIds.includes(id));
                      }
                    });
                  }}
                  className="ml-4 mr-2"
                />
                <AccordionTrigger
                  hideIcon
                  className="px-4 py-3 hover:bg-muted/50 hover:no-underline bg-muted/20"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      {module.replace(/_/g, ' ')}
                    </span>
                    <Badge
                      variant={
                        allSelected ? 'default' : selectedCount > 0 ? 'secondary' : 'outline'
                      }
                      className="text-[10px] h-4 px-1.5"
                    >
                      {selectedCount}/{groupedPermissions[module].length}
                    </Badge>
                  </div>
                </AccordionTrigger>
              </div>
              <AccordionContent className="px-0 pb-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y divide-x-0 sm:divide-x divide-border/40">
                  {modulePerms.map((perm) => {
                    const isChecked = selectedIds.includes(perm.id);
                    return (
                      <div
                        key={perm.id}
                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                          isChecked ? 'bg-primary/5' : 'hover:bg-accent/30'
                        }`}
                      >
                        <Checkbox
                          id={`perm-${perm.id}`}
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            setSelectedPermissions((prev) =>
                              checked ? [...prev, perm.id] : prev.filter((id) => id !== perm.id),
                            )
                          }
                          className="mt-0.5 shrink-0"
                        />
                        <Label
                          htmlFor={`perm-${perm.id}`}
                          className="flex-1 min-w-0 cursor-pointer space-y-0.5"
                        >
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-medium leading-tight">
                              {perm.name ?? ''}
                            </span>
                            {perm.isGlobal && (
                              <Badge variant="outline" className="text-[9px] h-3.5 px-1 py-0">
                                Global
                              </Badge>
                            )}
                            {perm.isAdmin && (
                              <Badge variant="destructive" className="text-[9px] h-3.5 px-1 py-0">
                                Admin
                              </Badge>
                            )}
                          </div>
                          {perm.description && (
                            <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">
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
    </div>
  );
};

export default PermissionSelector;
