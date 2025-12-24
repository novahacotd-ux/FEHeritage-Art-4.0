import { useMemo, useCallback } from 'react';
import { useUser } from '../context/UserContext';

export const useAuth = () => {
  const { user, isLoggedIn, loading, error } = useUser();

  // Kiểm tra xem user có phải admin không
  const isAdmin = useMemo(() => {
    return user?.roles?.some((role) => role.role_code === 'ADMIN') || false;
  }, [user]);

  // Kiểm tra xem user có role cụ thể không
  const hasRole = useCallback(
    (roleCode) => {
      return user?.roles?.some((role) => role.role_code === roleCode) || false;
    },
    [user]
  );

  // Kiểm tra xem user có ít nhất một trong các roles
  const hasAnyRole = useCallback(
    (roleCodes = []) => {
      return roleCodes.some((roleCode) => hasRole(roleCode));
    },
    [hasRole]
  );

  // Kiểm tra xem user có tất cả các roles
  const hasAllRoles = useCallback(
    (roleCodes = []) => {
      return roleCodes.every((roleCode) => hasRole(roleCode));
    },
    [hasRole]
  );

  // Lấy tên roles hiển thị
  const roleNames = useMemo(() => {
    return user?.roles?.map((role) => role.role_name).join(', ') || '';
  }, [user]);

  // Lấy role codes
  const roleCodes = useMemo(() => {
    return user?.roles?.map((role) => role.role_code) || [];
  }, [user]);

  // Kiểm tra xem user có active không
  const isActive = useMemo(() => {
    return user?.status === 'Active';
  }, [user]);

  return {
    // User info
    user,
    isLoggedIn,
    loading,
    error,

    // Role checks
    isAdmin,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    roleNames,
    roleCodes,

    // Status checks
    isActive,
  };
};

export default useAuth;
