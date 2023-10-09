import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {withOnyx} from 'react-native-onyx';
import CodesStep from './Steps/CodesStep';
import DisabledStep from './Steps/DisabledStep';
import EnabledStep from './Steps/EnabledStep';
import VerifyStep from './Steps/VerifyStep';
import SuccessStep from './Steps/SuccessStep';
import ONYXKEYS from '../../../../ONYXKEYS';
import CONST from '../../../../CONST';
import * as TwoFactorAuthActions from '../../../../libs/actions/TwoFactorAuthActions';
import TwoFactorAuthContext from './TwoFactorAuthContext';
import {defaultAccount, TwoFactorAuthPropTypes} from './TwoFactorAuthPropTypes';
import useAnimatedStepContext from '../../../../components/AnimatedStep/useAnimatedStepContext';

function TwoFactorAuthSteps({account = defaultAccount}) {
    const calculateCurrentStep = useMemo(() => {
        if (account.twoFactorAuthStep) {
            return account.twoFactorAuthStep;
        }
        return account.requiresTwoFactorAuth ? CONST.TWO_FACTOR_AUTH_STEPS.ENABLED : CONST.TWO_FACTOR_AUTH_STEPS.CODES;
    }, [account.requiresTwoFactorAuth, account.twoFactorAuthStep]);

    const [currentStep, setCurrentStep] = useState(calculateCurrentStep);

    const {setAnimationDirection} = useAnimatedStepContext();

    useEffect(() => () => TwoFactorAuthActions.clearTwoFactorAuthData(), []);

    useEffect(() => {
        setCurrentStep(calculateCurrentStep);
    }, [calculateCurrentStep]);

    const handleSetStep = useCallback(
        (step, animationDirection = CONST.ANIMATION_DIRECTION.IN) => {
            setAnimationDirection(animationDirection);
            TwoFactorAuthActions.setTwoFactorAuthStep(step);
            setCurrentStep(step);
        },
        [setAnimationDirection],
    );

    const renderStep = () => {
        switch (currentStep) {
            case CONST.TWO_FACTOR_AUTH_STEPS.CODES:
                return <CodesStep />;
            case CONST.TWO_FACTOR_AUTH_STEPS.VERIFY:
                return <VerifyStep />;
            case CONST.TWO_FACTOR_AUTH_STEPS.SUCCESS:
                return <SuccessStep />;
            case CONST.TWO_FACTOR_AUTH_STEPS.ENABLED:
                return <EnabledStep />;
            case CONST.TWO_FACTOR_AUTH_STEPS.DISABLED:
                return <DisabledStep />;
            default:
                return <CodesStep />;
        }
    };

    return (
        <TwoFactorAuthContext.Provider
            value={{
                setStep: handleSetStep,
            }}
        >
            {renderStep()}
        </TwoFactorAuthContext.Provider>
    );
}

TwoFactorAuthSteps.propTypes = TwoFactorAuthPropTypes;

// eslint-disable-next-line rulesdir/onyx-props-must-have-default
export default withOnyx({
    account: {key: ONYXKEYS.ACCOUNT},
})(TwoFactorAuthSteps);
