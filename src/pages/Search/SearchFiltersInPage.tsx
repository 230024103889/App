import React, {useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import ScreenWrapper from '@components/ScreenWrapper';
import SearchFiltersChatsSelector from '@components/Search/SearchFiltersChatsSelector';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as SearchActions from '@userActions/Search';
import ONYXKEYS from '@src/ONYXKEYS';

function SearchFiltersInPage() {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const [isScreenTransitionEnd, setIsScreenTransitionEnd] = useState(false);

    const [searchAdvancedFiltersForm] = useOnyx(ONYXKEYS.FORMS.SEARCH_ADVANCED_FILTERS_FORM);
    const handleScreenTransitionEnd = () => {
        setIsScreenTransitionEnd(true);
    };

    return (
        <ScreenWrapper
            testID={SearchFiltersInPage.displayName}
            includeSafeAreaPaddingBottom={false}
            shouldShowOfflineIndicatorInWideScreen
            offlineIndicatorStyle={styles.mtAuto}
            onEntryTransitionEnd={handleScreenTransitionEnd}
        >
            <HeaderWithBackButton title={translate('common.in')} />
            <View style={[styles.flex1]}>
                <SearchFiltersChatsSelector
                    isScreenTransitionEnd={isScreenTransitionEnd}
                    onFiltersUpdate={(selectedAccountIDs) => {
                        SearchActions.updateAdvancedFilters({
                            in: selectedAccountIDs,
                        });
                    }}
                    initialAccountIDs={searchAdvancedFiltersForm?.in ?? []}
                />
            </View>
        </ScreenWrapper>
    );
}

SearchFiltersInPage.displayName = 'SearchFiltersStatusPage';

export default SearchFiltersInPage;
