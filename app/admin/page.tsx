type AdminLoginProps = {
	searchParams?: {
		error?: string
		success?: string
	}
}

export default function AdminLogin({ searchParams }: AdminLoginProps) {
	const status = searchParams?.error ? "error" : searchParams?.success ? "success" : null
	const statusCopy =
		searchParams?.error === "missing"
			? "Please provide both email and password."
			: searchParams?.error === "invalid"
				? "The credentials you entered are incorrect."
				: searchParams?.success
					? "Login successful. You can now proceed to the admin dashboard."
					: null

	return (
		<>
			<section className="pt-120">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-5 col-lg-6">
							<div className="admin-login-card" style={{ background: "#fff", borderRadius: "18px", boxShadow: "0 25px 60px rgba(7,16,40,0.08)", padding: "48px 40px", textAlign: "left" }}>
								<div className="text-center mb-40">
									<div style={{ width: "82px", height: "82px", margin: "0 auto 20px", borderRadius: "22px", background: "var(--tg-theme-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "32px" }}>
										<i className="fas fa-user-shield" />
									</div>
									<h2 className="title mb-10" style={{ fontSize: "28px" }}>Welcome Back</h2>
									<p style={{ color: "#666" }}>Sign in to continue to the IBPC admin dashboard.</p>
								</div>
								{status && statusCopy && (
									<div
										style={{
											borderRadius: "12px",
											padding: "14px 18px",
											marginBottom: "24px",
											fontWeight: 600,
											color: status === "error" ? "#b42318" : "#0f5132",
											background: status === "error" ? "rgba(248,215,218,0.8)" : "rgba(209,231,221,0.9)",
											border: `1px solid ${status === "error" ? "rgba(220,53,69,0.4)" : "rgba(25,135,84,0.4)"}`
										}}
									>
										{statusCopy}
									</div>
								)}
								<form action="/api/admin/login" method="POST" className="admin-login-form">
									<div className="form-group mb-20">
										<label htmlFor="admin-email" className="form-label" style={{ fontWeight: 600, color: "#0f1c46", marginBottom: "6px", display: "block" }}>
											Email Address
										</label>
										<input
											id="admin-email"
											name="email"
											type="email"
											className="form-control"
											placeholder="name@ibpckuwait.org"
											style={{ height: "54px", borderRadius: "12px", borderColor: "#e5e7f0" }}
											required
											autoComplete="username"
										/>
									</div>
									<div className="form-group mb-30">
										<label htmlFor="admin-password" className="form-label" style={{ fontWeight: 600, color: "#0f1c46", marginBottom: "6px", display: "block" }}>
											Password
										</label>
										<input
											id="admin-password"
											name="password"
											type="password"
											className="form-control"
											placeholder="Enter password"
											style={{ height: "54px", borderRadius: "12px", borderColor: "#e5e7f0" }}
											required
											autoComplete="current-password"
										/>
									</div>
									<button type="submit" className="btn w-100" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "56px", borderRadius: "12px" }}>
										<span className="btn-text" data-text="Sign In" />
										<i className="fas fa-arrow-right" />
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

