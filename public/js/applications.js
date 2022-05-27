const register = document.querySelector('#reg');
const auth = document.querySelector('#auth');
const out = document.querySelector('#out');

console.log(' ------->> увидел аппликацию');

if (register) {
  register.addEventListener('submit', async (event) => {
    console.log('------->> Hello register is nayden');
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(register))
    // console.log(ObjectData)
    const response = await fetch(`/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      window.location.href = `/`
    }
  });
}


if (auth) {
  auth.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(auth))
    // console.log(ObjectData)
    const response = await fetch(`/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(formData),
    })
      console.log(response)
    if (response.ok) {
      console.log(response)
      window.location.href = `/catalog`
    } else {
      window.location.href = '/'
    }
    
  });
}

if (out) {
  out.addEventListener('submit', async (event) => {

    const response = await fetch(`/out`)

    if (responce.ok){
      window.location.href = `/`
    }
    
  })
  

    

 
}


