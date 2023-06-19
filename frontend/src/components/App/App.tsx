import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import TableSelectionPage from '../../pages/TableSelectionPage/TableSelectionPage';
import PrinterSelectionPage from '../../pages/PrinterSelectionPage/PrinterSelectionPage';
import OrderPage from '../../pages/OrderPage/OrderPage';
import OrderCompletedPage from '../../pages/OrderCompletedPage/OrderCompletedPage';
import AnotherProblemsPage from '../../pages/AnotherProblemsPage/AnotherProblemsPage';
import Header from '../Header/Header';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import PageScanDeffectiveGoods from '../../pages/PageScanDeffectiveGoods/PageScanDeffectiveGoods';
import PageWaitConfirmation from '../../pages/PageWaitConfirmation/PageWaitConfirmation';
import MissinGoodsPage from '../../pages/MissinGoodsPage/MissinGoodsPage';
import { useSelector } from '../../utils/type/store';

const App: FC = () => {
  const user = useSelector(store => store.userInfo.user);

  console.log(user);
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
        <ProtectedRoute path='/problems/another' exact>
          <AnotherProblemsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/deffectiveGoods' exact>
          <PageScanDeffectiveGoods />
        </ProtectedRoute>
        <ProtectedRoute path='/deffectiveGoods/waitConfirmation' exact>
          <PageWaitConfirmation />
        </ProtectedRoute>
        <ProtectedRoute path='/missinGoods' exact>
          <MissinGoodsPage />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
