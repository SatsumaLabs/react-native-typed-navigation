// @flow

import {type Options, type OptionsSplitView, mergeOptions} from './options';
import type {ComponentId, ComponentClassKey, ComponentIntent, StaticComponentId, ExternalComponentKey} from './keys';
import {Intent} from './keys';
import {Navigation} from 'react-native-navigation';

export type LayoutComponent = {| +component: ComponentIntent & {+options?: Options | void}|};

export type LayoutStack = {| +stack: {
    +id?:  StaticComponentId,
    +children: Layout[],
    +options?: Options | void
}|};

export type LayoutBottomTabs = {| +bottomTabs:{
    +id?:  StaticComponentId,
    +children: Layout[],
    +options?: Options
}|};

export type LayoutTopTabs = {| +topTabs:{
    +id?:  StaticComponentId,
    +children: Layout[],
    +options?: Options
}|};

export type LayoutSideMenu = {| +sideMenu: {
    +id?:  StaticComponentId,
    +left?: LayoutComponent,
    +center: Layout,
    +right?: LayoutComponent,
    +options?: Options,
}|};

export type LayoutSplitView = {| +splitView:{
    +id?:  StaticComponentId,
    +master: Layout,
    +detail: Layout,
    +options?: OptionsSplitView;
}|};

export type LayoutExternalComponent = {| +externalComponent: {
  +id?: StaticComponentId,
  +name: ExternalComponentKey;
  +options?: Options;
  +passProps?: {};
}|};

export type Layout = LayoutComponent | LayoutStack | LayoutBottomTabs | LayoutTopTabs | LayoutSideMenu | LayoutSplitView | LayoutExternalComponent;



export function setRootLayout(layout: Layout){
    Navigation.setRoot({root: layout});
}

export function pushStackLayout(self: ComponentId, layout: Layout){
    Navigation.push(self, layout);
}
export function pushStackScreen<Props:{}>(self: ComponentId, target: ComponentClassKey<Props>, props: Props){
    pushStackLayout(self, Intent(target,props));
}
export function popStack(self: ComponentId){
    Navigation.pop(self);
}
export function clearStack(self: ComponentId){
    Navigation.popToRoot(self).catch(() => {});
}
export function replaceStack(self: ComponentId, children: Layout[]){
    Navigation.setStackRoot(self,children);
}


export function pushModalLayout(layout: Layout){
    Navigation.showModal(layout);
}
export function pushModalScreen<Props:{}>(target: ComponentClassKey<Props>, props: Props){
    pushModalLayout(Intent(target,props));
}

export function popModal(self: ComponentId){
    Navigation.dismissModal(self);
}
export function clearModals(){
    Navigation.dismissAllModals();
}

export function pushOverlay(layout: LayoutComponent | LayoutExternalComponent){
    Navigation.showOverlay(layout);
}
export function popOverlay(self: ComponentId){
    Navigation.dismissOverlay(self);
}

export function openLeftMenu(self: ComponentId) {
    mergeOptions(self, {sideMenu: {left: {visible:true}}});
}
export function closeLeftMenu(self: ComponentId) {
    mergeOptions(self, {sideMenu: {left: {visible:false}}});
}
