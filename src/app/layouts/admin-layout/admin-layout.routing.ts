import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { DossierComponent } from '../../dossier/dossier.component';
import { FichierComponent } from '../../fichier/fichier.component';
import { UserComponent } from '../../user/user.component';
import { ProductComponent } from '../../product/product.component';
import { PostComponent } from '../../post/post.component';

import { EvenementComponent } from '../../evenement/evenement.component';
import { OrderComponent } from '../../order/order.component';
import { PotComponent } from '../../pot/pot.component';
import { ClaimComponent } from '../../claim/claim.component';
import {CategoryComponent} from "../../category/category.component";
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'drive',         component: DossierComponent },
    { path: 'fichier',        component: FichierComponent },
    { path: 'table',        component: TableListComponent },
    { path: 'event',        component: EvenementComponent },

    { path: 'user',        component: UserComponent },
    { path: 'product',        component: ProductComponent },
    { path: 'post',        component: PostComponent }  ,
  
    { path: 'order',        component: OrderComponent },
    { path: 'pot',        component: PotComponent },
    { path: 'claim',        component: ClaimComponent },


    { path: 'category',        component: CategoryComponent },


];
