import { ENV, getEnvInfo } from '../../lib/constants/env';
import { Badge } from '../ui/Badge';

export const DevIndicators = () => {
  if (!ENV.IS_DEV || !ENV.DEV_MODE) return null;

  const envInfo = getEnvInfo();

  return (
    <div className="fixed top-2 right-2 z-50 flex flex-col gap-1">
      <Badge variant={envInfo.isDev ? "success" : "warning"}>
        {envInfo.environment.toUpperCase()}
      </Badge>
      
      <Badge variant={envInfo.supabaseConfigured ? "success" : "error"}>
        {envInfo.supabaseConfigured ? "DB ✓" : "DB ✗"}
      </Badge>

      {ENV.DEV_MODE && (
        <Badge variant="info">
          DEV
        </Badge>
      )}

      {ENV.PWA_ENABLED && (
        <Badge variant="secondary">
          PWA
        </Badge>
      )}
    </div>
  );
};