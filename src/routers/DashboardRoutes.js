import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { BlogScreen } from "../components/blog/BlogScreen";//add by Mayra
import { PaisesScreen } from "../components/pais/PaisesScreen";
import { PaisDoc } from "../components/pais/PaisDoc";
import { Navbar } from "../components/ui/Navbar";
import { SearchScreen } from "../components/search/SearchScreen";
import { RulesType } from "../components/sr/RulesType";
import { Usuarios } from "../components/adminUsers/usuario";
import { NewUser } from "../components/adminUsers/newUser";
import { AdminSr } from "../components/adminSr/adminSr";
import { AdminDoc } from "../components/adminDocs/adminDoc";
import {CardsAdmin} from "../components/blog/CardsAdmin";//add by Mayra
import {CarouselAdmin} from "../components/blog/CarouselAdmin";//add by Mayra
import {ErizoAdmin} from "../components/blog/ErizoAdmin";//add by Mayra
import {SpecialRulesAdmin} from "../components/blog/SpecialRulesAdmin";//add by Mayra
import {ObsoleteRulesAdmin} from "../components/blog/ObsoleteRulesAdmin";//add by Mayra
import {MemesAdmin} from "../components/blog/MemesAdmin";//add by Mayra
import { SearchCustom } from "../components/customdocs/SearchCustom";
import { SearchDB } from "../components/dashboard/SearchDB";
import { Customs } from "../components/customdocs/adminCustom";
import { Dash } from "../components/dashboard/adminDash";
import { CustomDocs } from "../components/customdocs/customDocs";
import { CustomDocsD } from "../components/dashboard/customDocs";
import { AdminDocCustom } from "../components/customdocs/adminDoc";
import { AdminDocDash } from "../components/dashboard/adminDoc";
import { Checker } from "../components/maschecker/checker";
import { Overtimes } from "../components/payroll/overtimes";
import { HoursPay } from "../components/payroll/hrspay";
import { CheckAlerts } from "../components/rrhh/checkAlerts";
import {Erizo} from"../components/blog/erizo";
import {Rules} from "../components/blog/especialRules";
import {Memes} from "../components/blog/memes";
import { Obsolete } from "../components/blog/obsoleteRules";
export const DashboardRoutes = () =>{
  document.body.style.backgroundColor = "#283040";
  return(
    <>
    <Navbar/>
      <div>
        
        <Switch >
            <Route exact path="/blog" component={BlogScreen} />
            <Route exact path="/docs" component={PaisesScreen} />
            <Route exact path="/pais/:paisId/:type" component={PaisDoc} />
            <Route exact path="/search" component={SearchScreen} />
            <Route exact path="/custom" component={SearchCustom} />
            <Route exact path="/dashboard" component={SearchDB} />
            <Route exact path="/sr/:type" component={RulesType} />
            <Route exact path="/users" component={Usuarios} />
            <Route exact path="/users/new" component={NewUser} />
            <Route exact path="/adminDoc" component={AdminDoc} />
            <Route exact path="/adminSr" component={AdminSr} />
            <Route exact path="/AdminCustom" component={Customs} />
            <Route exact path="/AdminDash" component={Dash} />
            <Route exact path="/CardsAdmin" component={CardsAdmin} /> {/*add Mayra */}
            <Route exact path="/CarouselAdmin" component={CarouselAdmin} /> {/*add Mayra */}
            <Route exact path="/ErizoAdmin" component={ErizoAdmin} /> {/*add Mayra */}
            <Route exact path="/SpecialRulesAdmin" component={SpecialRulesAdmin} /> {/*add Mayra */}
            <Route exact path="/ObsoleteRulesAdmin" component={ObsoleteRulesAdmin} /> {/*add Mayra */}
            <Route exact path="/MemesAdmin" component={MemesAdmin} /> {/*add Mayra */}           
            <Route exact path="/customDocs/:webhook/:type" component={CustomDocs} />
            <Route exact path="/dashDocs/:webhook/:type" component={CustomDocsD} />
            <Route exact path="/adminCustomDoc" component={AdminDocCustom} />
            <Route exact path="/adminDashDoc" component={AdminDocDash} />
            <Route exact path="/checker" component={Checker} />
            <Route exact path="/overtimes" component={Overtimes} />
            <Route exact path="/hrspay" component={HoursPay} />
            <Route exact path="/checkerAlert" component={CheckAlerts} />
            <Route exact path="/incidents" component={CheckAlerts} />
            <Route exact path="/erizo" component={Erizo}/>
            <Route exact path= "/especialRules" component={Rules}/>
            <Route exact path= "/memes" component={Memes}/>
            <Route exact path={"/obsoleteRules"} component={Obsolete}/>
            <Redirect to ="/docs" />
        </Switch>
      </div>
    </>
  )
}