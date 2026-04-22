const buildAuditLog = (params: {
  modelName: string;
  action: string;
  actorId?: string | null;
  oldDetails?: unknown;
  newDetails?: unknown;
  timestamp: string;
}) => ({
  create: {
    modelName: params.modelName,
    action: params.action,
    actorId: params.actorId ?? null,
    timestamp: params.timestamp,
    ...(params.oldDetails !== undefined && { oldDetails: JSON.stringify(params.oldDetails) }),
    newDetails: JSON.stringify(params.newDetails),
  },
});

export default buildAuditLog;
