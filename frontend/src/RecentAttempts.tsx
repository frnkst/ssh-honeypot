import sortBy from 'lodash/sortBy';
import {Logins} from "./App";

type RecentAttemptProps = {
	data: Logins
}

export function RecentAttempts(props: RecentAttemptProps) {
	const sortedByTimestamp = sortBy(props.data, ['timestamp']).splice(0, 20)

	return (
			<>
				<h3>
					Last 20 attempts
				</h3>
				{ sortedByTimestamp.map((item, index) => (
						<div>
							<span className='indent' key={index}>{ item.username} { item.password}</span>
						</div>
				))}
			</>
	)
}


