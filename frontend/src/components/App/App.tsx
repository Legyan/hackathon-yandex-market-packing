import { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import TableSelectionPage from '../../pages/TableSelectionPage/TableSelectionPage';
import PrinterSelectionPage from '../../pages/PrinterSelectionPage/PrinterSelectionPage';
import OrderPage from '../../pages/OrderPage/OrderPage';
import OrderCompletedPage from '../../pages/OrderCompletedPage/OrderCompletedPage';
import ProblemsPage from '../../pages/ProblemsPage/ProblemsPage';
import AnotherProblemsPage from '../../pages/AnotherProblemsPage/AnotherProblemsPage';
import DefectiveGoods from '../../pages/DefectiveGoods/DefectiveGoods';
import Header from '../Header/Header';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import PageScanDeffectiveGoods from '../../pages/PageScanDeffectiveGoods/PageScanDeffectiveGoods';
import { useDispatch, useSelector } from '../../utils/type/store';
import { getUser } from '../../services/actions/userActions';

const App: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(stor => stor.userInfo.user);

  console.log(user);


  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <>
      <Header />
      <Switch>
        <ProtectedRoute path='/' exact>
          <MainPage />
        </ProtectedRoute>
        <Route path='/table' exact>
          <TableSelectionPage />
        </Route>
        <Route path='/printer' exact>
          <PrinterSelectionPage />
        </Route>
        <ProtectedRoute path='/order' exact>
          <OrderPage />
        </ProtectedRoute>
        <ProtectedRoute path='/order/completed' exact>
          <OrderCompletedPage />
        </ProtectedRoute>
        <ProtectedRoute path='/problems' exact>
          <ProblemsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/problems/another' exact>
          <AnotherProblemsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/defective' exact>
          <DefectiveGoods />
        </ProtectedRoute>
        <ProtectedRoute path='/ScanDeffectiveGoods' exact>
          <PageScanDeffectiveGoods />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
