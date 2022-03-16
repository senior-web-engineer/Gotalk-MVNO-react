import { Admin, Resource } from "react-admin";
import RESOURCE_NAMES from "./resource/resource-names";
import rootProvider from "./providers/root";
import authProvider from "./providers/auth";
import OrderList from "./resource/orders/list/List";
import OrderItem from "./resource/orders/item/Item";
import { UserList } from "./resource/user/list/List";
import { UserShow } from "./resource/user/show/Show";
import "./assets/styles/index.scss";
import Plans from "./resource/plans/list/List";
import PlansShow from "./resource/plans/show/Show";
import PlansPlintron from "./resource/plans-plintron/list/List";
import PlansPlintronShow from "./resource/plans-plintron/show/Show";
import PlansPlintronEdit from "./resource/plans-plintron/edit/Edit";
import PlansWholesales from "./resource/plans-wholesales/list/List";
import PlansWholesalesShow from "./resource/plans-wholesales/show/Show";
import UserEdit from "./resource/user/edit/Edit";
import OrderEdit from "./resource/orders/edit/Edit";
import PlansCreate from "./resource/plans/create/Create";
import PlansPlintronCreate from "./resource/plans-plintron/create/Create";
import PlansWholesalesCreate from "./resource/plans-wholesales/create/Create";
import PlansEdit from "./resource/plans/edit/Edit";
import PlansWholesalesEdit from "./resource/plans-wholesales/edit/Edit";

const App = () => (
  <div className="app">
    <Admin
      title="GoTalk"
      authProvider={authProvider}
      dataProvider={rootProvider}
    >
      <Resource
        name={RESOURCE_NAMES.ORDERS}
        list={OrderList}
        show={OrderItem}
        edit={OrderEdit}
      />
      <Resource
        name={RESOURCE_NAMES.PLANS}
        list={Plans}
        show={PlansShow}
        create={PlansCreate}
        edit={PlansEdit}
      />
      <Resource
        name={RESOURCE_NAMES.PLANS_PLINTRON}
        list={PlansPlintron}
        show={PlansPlintronShow}
        create={PlansPlintronCreate}
        edit={PlansPlintronEdit}
      />
      <Resource
        name={RESOURCE_NAMES.PLANS_WHOLESALES}
        list={PlansWholesales}
        show={PlansWholesalesShow}
        create={PlansWholesalesCreate}
        edit={PlansWholesalesEdit}
      />
      <Resource
        show={UserShow}
        list={UserList}
        name={RESOURCE_NAMES.USER}
        edit={UserEdit}
      />
    </Admin>
  </div>
);

export default App;
