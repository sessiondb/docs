import { h } from 'preact';
import { useState } from 'preact/hooks';

const STATIC_FORMS_ACTION = 'https://api.staticforms.dev/submit';

export default function NotifyMeDocs() {
	const [email, setEmail] = useState('');
	const [usecase, setUsecase] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const apiKey = 'sf_9259g3bm94fa0e7ndke0l1jk';

	if (!apiKey) {
		return (
			<p className="notify-fallback" style={{ color: '#a1a1aa' }}>
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
			<div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid rgba(167, 243, 208, 0.2)', backgroundColor: 'rgba(167, 243, 208, 0.05)', borderRadius: '0.5rem', textAlign: 'center' }}>
				<h3 style={{ margin: 0, color: '#34d399', fontSize: '1.125rem' }}>Successfully Joined!</h3>
				<p style={{ margin: '0.5rem 0 0 0', color: '#a1a1aa', fontSize: '0.9375rem' }}>
					Thank you for your interest. We'll reach out when the Kubernetes Operator is ready for testing.
				</p>
			</div>
		);
	}

	return (
		<div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.02)' }}>
			<h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', color: '#fff' }}>Join the Kubernetes Waitlist</h3>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
				<input type="hidden" name="apiKey" value={apiKey} />
				<input type="hidden" name="subject" value="Notify me: Kubernetes Waitlist" />
				<div>
					<label htmlFor="k8s-email" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#a1a1aa' }}>Email Address</label>
					<input
						type="email"
						id="k8s-email"
						name="email"
						value={email}
						onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
						placeholder="you@company.com"
						required
						style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.1)', background: '#09090b', color: '#e4e4e7', fontSize: '0.9375rem' }}
					/>
				</div>
				<div>
					<label htmlFor="k8s-usecase" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#a1a1aa' }}>Current Cloud / Infrastructure (Optional)</label>
					<input
						type="text"
						id="k8s-usecase"
						name="$usecase"
						value={usecase}
						onInput={(e) => setUsecase((e.target as HTMLInputElement).value)}
						placeholder="e.g. AWS EKS, GKE, On-Prem"
						style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid rgba(255,255,255,0.1)', background: '#09090b', color: '#e4e4e7', fontSize: '0.9375rem' }}
					/>
				</div>
				<button type="submit" style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: 500, fontSize: '0.9375rem', cursor: 'pointer', transition: 'background 0.2s', alignSelf: 'flex-start' }}>
					Notify Me
				</button>
				{error && <p style={{ color: '#ef4444', margin: 0, fontSize: '0.875rem' }}>{error}</p>}
			</form>
		</div>
	);
}
