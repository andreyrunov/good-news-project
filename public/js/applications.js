
const register = document.querySelector('#reg');
const auth = document.querySelector('#auth');

console.log('dsadsa');

// if (register) {
  register?.addEventListener('submit', async (event) => {
    console.log('hello blad');
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

if(response.ok) {
  window.location.href = `/auth`
  
}
      });
  // }

  if (auth) {
    auth.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(auth))
        // console.log(ObjectData)
        const response = await fetch(`/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(formData),
          })
  
          window.location.href = `/`
  
        });
    }
