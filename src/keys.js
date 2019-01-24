// @flow

import type {Component, ComponentType, ElementConfig} from 'react';
import {Navigation} from 'react-native-navigation';

export opaque type ComponentClassKey<-Props> = string;

export opaque type ComponentId = string;
export opaque type StaticComponentId : ComponentId = ComponentId;
export function makeStaticComponentId(tag: string): StaticComponentId {return tag;}

var registerComponentCtr : number = 0;

export function registerComponent<Props, ScreenType: ComponentType<Props>>(screen: ScreenType):
        ComponentClassKey<$ReadOnly<$Diff<ElementConfig<ScreenType>,{componentId: ComponentId | void}>>> {
    const dname = screen.displayName || screen.name || "";
    registerComponentCtr++;
    const tag = "NavScreen-" + registerComponentCtr + "-" + dname;
    Navigation.registerComponent(tag, () => screen);
    return tag;
}

// An opaque wrapper is required here as Flow does not support this kind of existential type
// the correct type is forall p. {+name: : ComponentClassKey<p>, +passProps: p}
export opaque type ComponentIntent : {+name: ComponentClassKey<empty>, +passProps: mixed} = {+name: ComponentClassKey<empty>, +passProps: mixed};

export function Intent<Props: {}, Opt>(target: ComponentClassKey<Props>, props: Props, opts?: Opt):
        ComponentIntent & {+options?: Opt}{
    return {
        name: target,
        passProps: props,
        options: opts
    };
}

export opaque type ButtonId = string;
var buttonKeyCounter : number = 0;

export function ButtonKey(name?: string): ButtonId {
    buttonKeyCounter++;
    const tag = "btn-" + buttonKeyCounter + "-" + (name || "");
    return tag;
}

export type ExternalComponentKey = string;
export type SharedElementKey = string;
