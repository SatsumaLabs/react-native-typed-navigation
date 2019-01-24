// @flow
import type {Component} from 'react';
import type {ComponentId,ButtonId} from './keys';
import {Navigation} from 'react-native-navigation';

export interface EventObserver {
    +componentDidAppear?: () => void;
    +componentDidDisappear?: () => void;
    +navigationButtonPressed?: {buttonId: ButtonId} => void;
    +modalDismissed?: () => void;
    +searchBarUpdated?: {text: string, isFocused: boolean} => void;
    +searchBarCancelPressed?: () => void;
}

export function bindLocalEvents<Props: {+componentId: ComponentId}>(self: Component<Props,any> & EventObserver): () => void{
    const sub = Navigation.events().bindComponent(self);
    return sub.remove;
}

export function bindGlobalButtonPressed(key: ButtonId, onPress: () => void) {
    function cb({buttonId}: {buttonId: ButtonId}) {
        if (buttonId === key) onPress();
    }
    const sub = Navigation.events().registerNavigationButtonPressedListener(cb);
    return sub.remove;
}

export function onAppLaunch(callback: bool => mixed) {
    let isFirstLaunch = true;
    Navigation.events().registerAppLaunchedListener(() => {
        callback(isFirstLaunch);
        isFirstLaunch = false;
    });
}
