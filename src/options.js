// @flow

import React, {type Element} from 'react';
import type {ComponentId, ComponentIntent, ComponentClassKey, ButtonId, SharedElementKey} from './keys';
import {ButtonKey} from './keys';
import {Navigation} from 'react-native-navigation';
import hamburgerIcon from '../icons/menu_24.png';
import closeIcon from '../icons/close_24.png';

type Color = string;
type FontFamily = string;
type AndroidDensityNumber = number;
type ImageRequireSource = number;

type Insets = {|
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
|};
type SystemItemIcon =
    'done' | 'cancel' | 'edit' | 'save' | 'add' | 'flexibleSpace' | 'fixedSpace' | 'compose' | 'reply' | 'action' |
    'organize' | 'bookmarks' | 'search' | 'refresh' | 'stop' | 'camera' | 'trash' | 'play' | 'pause' | 'rewind' | 'fastForward' | 'undo' | 'redo';

export type OptionsSplitView = {|
    +displayMode?: 'auto' | 'visible' | 'hidden' | 'overlay', //Master view display mode
    +primaryEdge?: 'leading' | 'trailing', // Master view side. Leading is left. Trailing is right.
    +minWidth?: number, //Set the minimum width of master view
    +maxWidth?: number, //Set the maximum width of master view
|};

export type OptionsStatusBar = {|
    +visible?: boolean, //Set the status bar visibility (default true)
    +style?: 'light' | 'dark', //Set the text color of the status bar (default 'light')
    +backgroundColor?: Color, //Set the background color of the status bar (Android specific)
    +drawBehind?: boolean, //Draw screen behind the status bar (Android specific)
|};

export type OptionsLayout = {|
    +backgroundColor?: Color, //Set the screen background color
    +componentBackgroundColor?: Color, //Set background color only for components, helps reduce overdraw if background color is set in default options. (Android specific)
    +orientation?: ('portrait' | 'landscape')[], //Set the allowed orientations
    +topMargin?: number, //Layout top margin (Android specific)
|};

export type OptionsModalPresentationStyle =
    'formSheet' |
    'pageSheet' |
    'overFullScreen' |
    'overCurrentContext' |
    'currentContext' |
    'popOver' |
    'fullScreen' |
    'none';

export type OptionsModalTransitionStyle =
    'coverVertical' |
    'crossDissolve' |
    'flipHorizontal' |
    'partialCurl';

export type OptionsTopBarLargeTitle = {|
    +visible?: boolean; //Enable large titles
    +fontSize?: number;
    +color?: Color;
    +fontFamily?: FontFamily;
|};

export type OptionsTopBarTitle = {|
    +text?: string; //Text to display in the title area
    +fontSize?: number;
    +color?: Color;
    +fontFamily?: FontFamily; //Title font family. Make sure that the font is available

    +component?: ComponentIntent,
    +height?: number; //Top Bar title height in densitiy pixels (Android specific)
    +alignment?: 'center' | 'fill'; //Title alignment (Android specific)
|};

export type OptionsTopBarSubtitle = {|
    +text?: string;
    +fontSize?: number;
    +color?: Color;
    +fontFamily?: FontFamily;
    +alignment?: 'center';
|};

export type OptionsTopBarBackButton = {|
    +icon?: ImageRequireSource; //Image to show as the back button
    +visible?: boolean; //Whether the back button is visible or not (default true)
    +title?: string; //Set the back button title (iOS specific)
    +showTitle?: boolean; //Show title or just the icon (iOS specific)
    +color?: Color; //Back button icon and text color
|};

export type OptionsTopBarBackground = {|
    +color?: Color; //Background color of the top bar
    +component?: //Set a custom component for the Top Bar background
        {|+name?: ComponentClassKey<{||}>;|};
    +clipToBounds?: boolean; //Clip the top bar background to bounds if set to true. (iOS specific)
    +translucent?: boolean; //Allows the NavBar to be translucent (blurred) (iOS specific)
    +blur?: boolean; //Enable background blur (iOS specific)
|};

export type ButtonDef = {|
    +id: ButtonId; //Button id for reference press event
    +enabled?: boolean; //Set the button enabled or disabled (default true)


    +icon?: ImageRequireSource; //Set the button icon
    +disableIconTint?: boolean; //Disable icon tinting
    +systemItem?: SystemItemIcon; //(iOS only) Set the button as an iOS system icon

    +component?: ComponentIntent;

    +text?: string; //Set the button text
    +color?: Color; //Set text color
    +disabledColor?: Color; //Set text color in disabled state
    +fontFamily?: string; //Set the button font family
    +testID?: string; //Set testID for reference in E2E tests
|};

export type OptionsTopBar = {|
    +visible?: boolean; //Show or hide the top bar
    +animate?: boolean; //Controls whether TopBar visibility changes should be animated
    +hideOnScroll?: boolean; //Top bar will hide and show based on users scroll direction
    +buttonColor?: Color; //Change button colors in the top bar
    +drawBehind?: boolean; //Draw behind the navbar
    +testID?: string; //Can be used to reference the top bar in E2E tests

    +title?: OptionsTopBarTitle; //Title configuration
    +subtitle?: OptionsTopBarSubtitle; //Subtitle configuration
    +backButton?: OptionsTopBarBackButton; //Back button configuration
    +leftButtons?: ButtonDef[]; //List of buttons to the left
    +rightButtons?: ButtonDef[]; //List of buttons to the right
    +background?: OptionsTopBarBackground; //Background configuration

    +barStyle?: 'default' | 'black'; //Control the NavBar blur style (iOS specific, requires translucent: true)
    +noBorder?: boolean;  //Disable the border on bottom of the navbar (iOS specific)
    +searchBar?: boolean; //Show a UISearchBar in the Top Bar (iOS 11+ specific)
    +searchBarHiddenWhenScrolling?: boolean; //Hides the UISearchBar when scrolling (iOS 11+ specific)
    +searchBarPlaceholder?: string; //The placeholder value in the UISearchBar (iOS 11+ specific)
    +largeTitle?: OptionsTopBarLargeTitle; //Control the Large Title configuration (iOS 11+ specific)

    +height?: AndroidDensityNumber; //Set the height of the navbar in dp (Android specific)
    +borderColor?: Color; //Change the navbar border color (Android specific)
    +borderHeight?: AndroidDensityNumber; //Set the border height of the navbar in dp (Android specific)
    +elevation?: AndroidDensityNumber; //Set the elevation of the navbar in dp (Android specific)
|};

export type OptionsFab = {|
    +id: ButtonKey;
    +backgroundColor?: Color;
    +clickColor?: Color;
    +rippleColor?: Color;
    +visible?: boolean;
    +icon?: ImageRequireSource;
    +iconColor?: Color;
    +alignHorizontally?: 'left' | 'right';
    +alignVertically?: 'top' | 'bottom';
    +hideOnScroll?: boolean;
    +size?: number;
    +actions?: OptionsFab[];
|};

export type OptionsBottomTabs = {|
    +visible?: boolean; //Show or hide the bottom tabs
    +animate?: boolean; //Enable animations when toggling visibility
    +currentTabIndex?: number; //Switch to another screen within the bottom tabs via index (starting from 0)
    +currentTabId?: ComponentId; //Switch to another screen within the bottom tabs via screen name
    +testID?: string; //Set a testID to reference the bottom tabs
    +drawBehind?: boolean; //Draw screen component under the tab bar
    +backgroundColor?: Color; //Set a background color for the bottom tabs
    +barStyle?: 'default' | 'black'; //Control the Bottom Tabs blur style (iOS specific, requires translucent: true)
    +translucent?: boolean; //Allows the Bottom Tabs to be translucent (blurred) (iOS specific)
    +hideShadow?: boolean; //Hide the top line of the Tab Bar (iOS specific)
    +titleDisplayMode?: 'alwaysShow' | 'showWhenActive' | 'alwaysHide'; //Control the text display mode below the tab icon  (Android specific)
    +elevation?: AndroidDensityNumber; //Set the elevation of the Bottom Tabs in dp (Android specific)
|};

export type OptionsBottomTab = {|
    +text?: string; //Set the text to display below the icon
    +badge?: string; //Set the text in a badge that is overlayed over the component
    +testID?: string; //Set a testID to reference the tab in E2E tests
    +icon?: ImageRequireSource; //Set the tab icon

    +iconColor?: Color; //Set the icon tint
    +textColor?: Color; //Set the text color
    +selectedIconColor?: Color; //Set the selected icon tint
    +selectedTextColor?: Color; //Set the selected text color
    +badgeColor?: string; //Set the background color of the badge that is overlayed over the component
    +fontFamily?: FontFamily; //Set the text font family
    +fontSize?: number; //Set the text font size

    +iconInsets?: Insets; //Set the insets of the icon (iOS specific)
    +selectedIcon?: ImageRequireSource; //Set selected icon image (iOS specific)
    +disableIconTint?: boolean; //Set true if you want to disable the icon tinting (iOS specific)
    +disableSelectedIconTint?: boolean; //Set true if you want to disable the text tinting (iOS specific)
    +selectedFontSize?: number; //Set the font size for selected tabs (Android specific)
|};

export type OptionsSideMenu = {|
    +left?: {| //Configure the left side menu
        +visible?: boolean;
        +enabled?: boolean;
    |};
    +right?: {| //Configure the right side menu
        +visible?: boolean;
        +enabled?: boolean;
    |};
    +openGestureMode?: 'entireScreen' | 'bezel'; //Configure how a user is allowed to open a drawer using gestures (iOS specific)
|};

export type OptionsOverlay = {|
    +interceptTouchOutside?: boolean; //Capture touches outside of the Component View
|};

export type OptionsPreviewAction = {|
    +id: string; //Reference ID to get callbacks from
    +title: string; //Action text
    +style?: 'default' | 'selected' | 'destructive';  //Action style
    +actions?: OptionsPreviewAction[]; //Subactions that will be shown when this action is pressed.
|};

export type OptionsPreview = {|
    +reactTag?: number; //Pass a react node tag to mark a SourceRect for a specific peek and pop preview element.
    +width?: number; //You can set this property specify the width of the preview. If the width is greater than the device width, it will be zoomed in.
    +height?: 100; //Height of the preview
    +commit?: boolean; //You can control if the users gesture will result in pushing the preview screen into the stack.
    +actions?: OptionsPreviewAction[]; //List of actions that will appear underneath the preview window. They can be nested for sub actions.
|};

export type OptionsAnimationPropertyConfig = {|
    +from?: number; //Animate from this value, ex. 0
    +to?: number; //Animate to this value, ex. 1
    +duration?: number; //Animation duration (default 300)
    +startDelay?: number; //Animation delay
    +interpolation?: 'accelerate' | 'decelerate' | void; //Animation interplation
|};

export type OptionsAnimationProperties = {|
    +x?: OptionsAnimationPropertyConfig; //Animate the element over translateX
    +y?: OptionsAnimationPropertyConfig; //Animate the element over translateY
    +alpha?: OptionsAnimationPropertyConfig; //Animate the element over opacity
    +scaleX?: OptionsAnimationPropertyConfig; //Animate the element over scaleX
    +scaleY?: OptionsAnimationPropertyConfig; //Animate the element over scaleY
    +rotationX?: OptionsAnimationPropertyConfig; //Animate the element over rotationX
    +rotationY?: OptionsAnimationPropertyConfig; //Animate the element over rotationY
    +rotation?: OptionsAnimationPropertyConfig; //Animate the element over rotation
|};

export type OptionsAnimationSeparate = {|
    +topBar?: OptionsAnimationProperties; //Configure animations for the top bar
    +bottomTabs?: OptionsAnimationProperties; //Configure animations for the bottom tabs
    +content?: OptionsAnimationProperties; //Configure animations for the content (Screen)
|};

export type OptionsAnimations = {|
    +setRoot?: OptionsAnimationProperties; //Configure the setRoot animation
    +push?: OptionsAnimationSeparate; //Configure what animates when a screen is pushed
    +pop?: OptionsAnimationSeparate; //Configure what animates when a screen is popped
    +showModal?: OptionsAnimationProperties; //Configure what animates when modal is shown
    +dismissModal?: OptionsAnimationProperties; //Configure what animates when modal is dismissed
|};

export type OptionsCustomTransition = {|
    +animations: OptionsCustomTransitionAnimation[];
    +duration?: number;
|};

export type OptionsCustomTransitionAnimation = {|
  type: 'sharedElement'; //Animation type, only support sharedElement currently
  +fromId: SharedElementKey; //Transition from element Id
  +toId: SharedElementKey; //Transition to element Id
  +startDelay?: number; //Animation delay
  +springVelocity?: number; //Animation spring Velocity
  +duration?: number; //Animation duration
|};

export type Options = {|
  +statusBar?: OptionsStatusBar; //Configure the status bar
  +layout?: OptionsLayout; //Configure the layout
  +modalPresentationStyle?: OptionsModalPresentationStyle; //Configure the presentation style of the modal
  +modalTransitionStyle?: OptionsModalTransitionStyle; //Configure the transition style of the modal (Android specific)
  +topBar?: OptionsTopBar; //Configure the top bar
  +fab?: OptionsFab;
  +bottomTabs?: OptionsBottomTabs; //Configure the bottom tabs
  +bottomTab?: OptionsBottomTab; //Configure the bottom tab associated to the screen
  +sideMenu?: OptionsSideMenu; //Configure the side menu
  +overlay?: OptionsOverlay; //Configure the overlay
  +animations?: OptionsAnimations; //Animation used for navigation commands that modify the layout
  +customTransition?: OptionsCustomTransition; //Custom Transition used for animate shared element between two screens

  +preview?: OptionsPreview; //Preview configuration for Peek and Pop (iOS specific)
  +popGesture?: boolean; //Enable or disable swipe back to pop gesture (iOS specific)
  +backgroundImage?: ImageRequireSource; //Background image for the screen (iOS specific)
  +rootBackgroundImage?: ImageRequireSource; //Background image for the Navigation View (iOS specific)
  +blurOnUnmount?: boolean; //Enable or disable automatically blurring focused input, dismissing keyboard on unmount (Android specific)
|};

export function SharedElement(props: {+elementId: SharedElementKey, +children: Element<any>}){
    return <Navigation.Element {...props} />;
}

export function mergeOptions(self: ComponentId, opts: Options){
    Navigation.mergeOptions(self,opts);
}

export function setDefaultOptions(defOpts: Options){
    Navigation.setDefaultOptions(defOpts);
}

// Common options

export function titleBar (title: string, options?: OptionsTopBar) {
    return {topBar: {...options, title: {text: title}}};
}
export const noShadow = {elevation: 0};

export const hamburgerMenuBtn = ButtonKey('openHamburgerMenu');
export function leftMenuButton(color?:Color) {
    return {
        leftButtons: [{id: hamburgerMenuBtn, icon: hamburgerIcon, color: color}],
        backButton: {visible: false}
    };
}
export function setRightButtons(self: ComponentId, buttons: ButtonDef[]){
    mergeOptions(self, {topBar: {rightButtons: buttons}});
}

export const closeBackButton = {
    backButton: {icon: closeIcon}
};

export const modalLightBox = {
    modalPresentationStyle: 'overCurrentContext',
    layout: {backgroundColor: 'rgba(0,0,0,0.5)'},
    animations: {
        showModal: {alpha: {
            from: 0,
            to: 1,
            duration: 200,
            startDelay: 0,
            interpolation: 'accelerate'
        }},
        dismissModal: {alpha: {
            from: 1,
            to: 0,
            duration: 200,
            startDelay: 100,
            interpolation: 'accelerate'
        }},
    }
};
