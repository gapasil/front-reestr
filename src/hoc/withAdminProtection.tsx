import React, { ComponentType } from 'react';
import { useAppSelector } from '@/hooks/ReduxHooks';
import { useCheckAdmin } from '@/hooks/userHooks';

const withAdminProtection = <P extends object>(
  WrappedComponent: ComponentType<P>,
): React.FC<P> => {
  const AdminProtectedComponent: React.FC<P> = (props: P) => {
    const { isOpen } = useAppSelector((state) => state.authAndRegForm);
    const admin = useCheckAdmin(isOpen);

    if (!admin) {
      return <div>У вас нет прав доступа к этому разделу.</div>;
    }

    return <WrappedComponent {...props} />;
  };

  AdminProtectedComponent.displayName = `withAdminProtection(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AdminProtectedComponent;
};

export default withAdminProtection;
