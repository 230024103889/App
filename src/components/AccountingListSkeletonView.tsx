import React from 'react';
import {Circle, Rect} from 'react-native-svg';
import ItemListSkeletonView from './Skeletons/ItemListSkeletonView';

type AccountingListSkeletonViewProps = {
    shouldAnimate?: boolean;
    gradientOpacity?: boolean;
};

function AccountingListSkeletonView({shouldAnimate = true, gradientOpacity = false}: AccountingListSkeletonViewProps) {
    return (
        <ItemListSkeletonView
            shouldAnimate={shouldAnimate}
            gradientOpacity={gradientOpacity}
            renderSkeletonItem={() => (
                <>
                    <Circle
                        cx="20"
                        cy="32"
                        r="20"
                    />
                    <Rect
                        x="54"
                        y="28"
                        width="40%"
                        height="8"
                    />
                </>
            )}
        />
    );
}

AccountingListSkeletonView.displayName = 'AccountingListSkeletonView';

export default AccountingListSkeletonView;
