import { useState } from 'preact/hooks';

const STATIC_FORMS_ACTION = 'https://api.staticforms.dev/submit';

interface NotifyMeFormProps {
	readonly featureName: string;
}

/**
 * "Notify me when this is ready" form. POSTs to Static Forms.
 * If PUBLIC_STATIC_FORMS_API_KEY is missing, shows a fallback message.
 */
export default function NotifyMeForm({ featureName }: NotifyMeFormProps) {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const apiKey = 'sf_9259g3bm94fa0e7ndke0l1jk';

	if (!apiKey) {
		return (
			<p className="notify-fallback">
				Notify me coming soon. Set <code>PUBLIC_STATIC_FORMS_API_KEY</code> to enable.
			</p>
		);
	}

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setError(null);

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		try {
			const res = await fetch(STATIC_FORMS_ACTION, {
				method: 'POST',
				body: formData,
			});
			if (res.ok) {
				setSubmitted(true);
			} else {
				setError('Something went wrong. Please try again.');
			}
		} catch {
			setError('Something went wrong. Please try again.');
		}
	};

	if (submitted) {
		return (
			<p className="notify-success">
				We'll notify you when {featureName} is ready.
			</p>
		);
	}

	return (
		<form
			className="notify-form"
			action={STATIC_FORMS_ACTION}
			method="POST"
			onSubmit={handleSubmit}
		>
			<input type="hidden" name="apiKey" value={apiKey} />
			<input type="hidden" name="subject" value={`Notify me: ${featureName}`} />
			<input
				type="email"
				name="email"
				value={email}
				onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
				placeholder="Email"
				required
				className="notify-input"
				aria-label="Email for notification"
			/>
			<button type="submit" className="notify-btn">
				Notify me when this is ready
			</button>
			{error && <p className="notify-error">{error}</p>}
		</form>
	);
}
