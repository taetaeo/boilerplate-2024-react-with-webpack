import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

// Props 타입 정의
interface AuthProps {}

// 인증 상태를 확인하고 리다이렉트하는 HOC
const withAuth = <P extends AuthProps>(Component: React.ComponentType<P>) => {
  const AuthenticatedComponent: FC<P> = props => {
    const navigate = useNavigate();

    // 예. 사용자 인증 상태를 확인하는 로직
    const isAuthenticated = true;

    // 인증되지 않은 경우 리다이렉트
    if (!isAuthenticated) {
      navigate('/');
      return null;
    }

    // 인증된 경우 원래 컴포넌트를 반환
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
export default withAuth;
