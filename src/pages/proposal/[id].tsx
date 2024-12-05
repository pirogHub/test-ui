import React from 'react';

import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/router';

const Application = ({...params}) => {
	const router = useRouter();
	const appId = router.query.id;
	console.log('userSlug', appId);
	return <div>Application: ${appId}</div>;
};

export default Application;
