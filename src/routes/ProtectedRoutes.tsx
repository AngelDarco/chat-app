import { Navigate } from 'react-router';

type routeType = { route: string, element: JSX.Element, validation: string | null | boolean }; 
/** 
 * @description route: route to redirect if validation is true.
 * @description element: JSX.Element to render if validation is false.
 * @description validation: string | null | boolean.
 * 
 * */

const ProtectedRoutes = ({ route, element, validation }: routeType) :JSX.Element => {
	return validation ? <Navigate to={route} /> : element;
};
export default ProtectedRoutes;