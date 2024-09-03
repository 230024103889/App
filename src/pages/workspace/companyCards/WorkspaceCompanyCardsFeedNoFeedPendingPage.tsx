import React from 'react';
import EmptyStateComponent from '@components/EmptyStateComponent';
import * as Illustrations from '@components/Icon/Illustrations';
import TableListItemSkeleton from '@components/Skeletons/TableRowSkeleton';
import TextLink from '@components/TextLink';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import colors from '@styles/theme/colors';
import * as ReportInstance from '@userActions/Report';
import CONST from '@src/CONST';

function WorkspaceCompanyCardsFeedNoFeedPendingPage() {
    const {translate} = useLocalize();
    const styles = useThemeStyles();

    const subtitle = (
        <>
            {translate('workspace.moreFeatures.companyCards.pendingNoFeedDescription')}
            <TextLink onPress={() => ReportInstance.navigateToConciergeChat()}> {CONST?.CONCIERGE_CHAT_NAME}</TextLink>
        </>
    );

    return (
        <EmptyStateComponent
            SkeletonComponent={TableListItemSkeleton}
            headerMediaType={CONST.EMPTY_STATE_MEDIA.ILLUSTRATION}
            headerMedia={Illustrations.CompanyCardsPendingState}
            headerStyles={[styles.emptyStateCardIllustrationContainer, {backgroundColor: colors.ice800}]}
            headerContentStyles={styles.emptyStateCardIllustration}
            title={translate('workspace.moreFeatures.companyCards.pendingNoFeedTitle')}
            subtitle={subtitle}
        />
    );
}

WorkspaceCompanyCardsFeedNoFeedPendingPage.displayName = 'WorkspaceCompanyCardsFeedNoFeedPendingPage';

export default WorkspaceCompanyCardsFeedNoFeedPendingPage;
