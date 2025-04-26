import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { authGuard } from './_guards/auth.guard';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartProductListComponent } from './cart/cart-product-list/cart-product-list.component';

export const routes: Routes = [
    {path: '', component: ProductListComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {
        path: '', 
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'favorites', component: FavoritesComponent},
            {path: 'cart', component: CartProductListComponent},
        ]
    },
];
