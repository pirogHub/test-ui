import React from 'react';

import ProposalCreate from '@/widgets/proposal/proposal-create-page';

const Page = () => {
	return (
		<div>
			<ProposalCreate isModalOpen={true} closeModal={() => {}} />
		</div>
	);
};

export default Page;
