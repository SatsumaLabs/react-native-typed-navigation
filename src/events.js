// @flow
import type {Component} from 'react';
import type {ComponentId,ButtonId} from './keys';
import {setDefaultOptions, type Options} from './options';
import {Navigation} from 'react-native-navigation';
import {Linking} from 'react-native';

export interface EventObserver {
    +componentDidAppear?: () => void;
    +componentDidDisappear?: () => void;
    +navigationButtonPressed?: {buttonId: ButtonId} => void;
    +modalDismissed?: () => void;
    +searchBarUpdated?: {text: string, isFocused: boolean} => void;
    +searchBarCancelPressed?: () => void;
}

export type CancelBind = () => void;

export function bindLocalEvents<Props: {+componentId: ComponentId}>(self: Component<Props,any> & EventObserver): CancelBind{
    const sub = Navigation.events().bindComponent(self);
    return sub.remove;
}

export function bindGlobalButtonPressed(key: ButtonId, onPress: () => void): CancelBind {
    function cb({buttonId}: {buttonId: ButtonId}) {
        if (buttonId === key) onPress();
    }
    const sub = Navigation.events().registerNavigationButtonPressedListener(cb);
    return sub.remove;
}

/*
export function onAppLaunch(callback: bool => mixed) {
    let isFirstLaunch = true;
    Navigation.events().registerAppLaunchedListener(() => {
        callback(isFirstLaunch);
        isFirstLaunch = false;
    });
}
*/

var initCalled: bool = false;
var pendingDeepLink: string | null = null;
var deepLinkHandler: (string => mixed) | null = null;

function processDeepLink({url}:{url: ?string}) {
    if (!url) return;
    else if (deepLinkHandler) deepLinkHandler(url);
    else pendingDeepLink = url;
}

export function bindDeepLinks(handler: string => mixed): CancelBind {
    deepLinkHandler = handler;
    if (pendingDeepLink) handler(pendingDeepLink);
    pendingDeepLink = null;
    return () => {deepLinkHandler = null;};
}

export function runNavigationApp(defOptions: ?Options, init: () => mixed){
    if (initCalled) throw Error("runNavigationApp may only be called once");
    initCalled = true;
    if (defOptions) setDefaultOptions(defOptions);
    Linking.addEventListener('url', processDeepLink);
    Navigation.events().registerAppLaunchedListener(() => {
        if (defOptions) setDefaultOptions(defOptions);
        pendingDeepLink = null;
        deepLinkHandler = null;
        Linking.getInitialURL().then(url => processDeepLink({url}));
        init();
    });
}
