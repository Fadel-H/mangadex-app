import React from 'react'

function Login({onChange, onLoginSubmit}) {

  return (
   <>
   <form id="form" onSubmit={onLoginSubmit}>
    <section className="vh-100 gradient-custom" id="sectionBlock">
      <div className="container py-5 h-100">
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
             <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  <div className="form-outline form-white mb-4">
                    <input type="username" name="username" onChange={onChange} className="form-control form-control-lg" placeholder="username" required />
                    <label className="form-label">Username</label>
                  </div>
                  <div className="form-outline form-white mb-4">
                  <input type="password" name="password"  onChange={onChange} className="form-control form-control-lg" placeholder="password" required />
                    <label className="form-label">Password</label>
                  </div>
                  <button type="submit" className="btn btn-outline-light btn-lg px-5" >Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
  </>
  )
}

export default Login