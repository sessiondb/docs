import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';

interface DemoLinkProps {
	children: any;
}

export default function DemoLink({ children }: DemoLinkProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [copiedField, setCopiedField] = useState<string | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const creds = {
		email: "guest@sessiondb.internal",
		password: "guest123"
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleCopy = async (text: string, field: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedField(field);
			setTimeout(() => setCopiedField(null), 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	};

	return (
		<div 
			ref={wrapperRef} 
			style={{ position: 'relative', display: 'inline-block' }}
			onClickCapture={(e) => {
				if (modalRef.current && modalRef.current.contains(e.target as Node)) {
					return;
				}
				e.preventDefault();
				e.stopPropagation();
				setIsOpen(!isOpen);
			}}
		>
			{children}

			{isOpen && (
				<div 
					ref={modalRef}
					style={{
					position: 'absolute',
					top: 'calc(100% + 10px)',
					right: 0,
					width: '280px',
					background: '#09090b',
					border: '1px solid rgba(255,255,255,0.1)',
					borderRadius: '0.5rem',
					padding: '1.25rem',
					boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255,255,255,0.05)',
					zIndex: 1000,
					color: '#e4e4e7',
					textAlign: 'left',
					fontSize: '0.875rem'
				}}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 0.5rem 0' }}>
						<h4 style={{ margin: 0, color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Demo Login</h4>
						<button 
							onClick={() => handleCopy(`Email: ${creds.email}\nPassword: ${creds.password}`, 'both')}
							style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.25rem', color: '#a1a1aa', cursor: 'pointer', fontSize: '0.7rem', transition: 'background 0.2s', height: 'fit-content' }}
							onMouseEnter={(e: any) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
							onMouseLeave={(e: any) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
						>
							{copiedField === 'both' ? 'Copied All!' : 'Copy All'}
						</button>
					</div>
					<p style={{ margin: '0 0 1.25rem 0', color: '#a1a1aa', fontSize: '0.8125rem' }}>
						Use these credentials to jump straight into the live dashboard.
					</p>
					
					<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
						<div>
							<div style={{ fontSize: '0.75rem', color: '#a1a1aa', marginBottom: '0.375rem' }}>Email</div>
							<div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.375rem', overflow: 'hidden' }}>
								<code style={{ flex: 1, padding: '0.5rem 0.75rem', userSelect: 'all', fontSize: '0.8125rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
									{creds.email}
								</code>
								<button 
									onClick={() => handleCopy(creds.email, 'email')}
									style={{ padding: '0 0.75rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa', cursor: 'pointer', fontSize: '0.75rem', transition: 'background 0.2s', minWidth: '60px' }}
									onMouseEnter={(e: any) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
									onMouseLeave={(e: any) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
								>
									{copiedField === 'email' ? 'Copied!' : 'Copy'}
								</button>
							</div>
						</div>
						
						<div>
							<div style={{ fontSize: '0.75rem', color: '#a1a1aa', marginBottom: '0.375rem' }}>Password</div>
							<div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.375rem', overflow: 'hidden' }}>
								<code style={{ flex: 1, padding: '0.5rem 0.75rem', userSelect: 'all', fontSize: '0.8125rem', color: '#fff' }}>
									{creds.password}
								</code>
								<button 
									onClick={() => handleCopy(creds.password, 'password')}
									style={{ padding: '0 0.75rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa', cursor: 'pointer', fontSize: '0.75rem', transition: 'background 0.2s', minWidth: '60px' }}
									onMouseEnter={(e: any) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
									onMouseLeave={(e: any) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
								>
									{copiedField === 'password' ? 'Copied!' : 'Copy'}
								</button>
							</div>
						</div>
					</div>

					<a 
						href="https://demo.sessiondb.in" 
						target="_blank" 
						rel="noopener noreferrer"
						style={{ display: 'block', width: '100%', padding: '0.625rem 0', background: '#fff', color: '#09090b', textAlign: 'center', textDecoration: 'none', borderRadius: '0.375rem', fontWeight: 500, fontSize: '0.875rem', transition: 'background 0.2s' }}
						onMouseEnter={(e: any) => (e.currentTarget.style.background = '#e4e4e7')}
						onMouseLeave={(e: any) => (e.currentTarget.style.background = '#fff')}
						onClick={() => setIsOpen(false)}
					>
						Enter Dashboard
					</a>
				</div>
			)}
		</div>
	);
}
