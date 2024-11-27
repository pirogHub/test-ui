import {Header} from '@/components/header';
import {Head, Html, Main, NextScript} from 'next/document';

// eslint-disable-next-line react/function-component-definition
export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
