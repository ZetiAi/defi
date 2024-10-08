import {
	deniedSignature,
	invalidTransaction,
	transactionCompleted,
	transactionDenied,
	transactionSend,
	transactionUnderpriced
} from '$lib/config/constants/notifications';

export const spawnErrorNotification = (
	addNotification,
	error: { code: number; message: string }
) => {
	const { code } = error;
	switch (code) {
		case 4001:
			addNotification(deniedSignature);
			break;

		case -32602:
			addNotification(invalidTransaction);
			break;

		case -32603:
			addNotification(transactionUnderpriced);
			break;

		default:
			addNotification(transactionDenied);
			break;
	}
};

type successState = 'SENT' | 'MINED';

export const spawnSuccessNotification = (
	addNotification,
	state: successState
) => {
	if (state === 'SENT') {
		addNotification(transactionSend);
		return;
	}

	if (state === 'MINED') {
		addNotification(transactionCompleted);
	}
};
