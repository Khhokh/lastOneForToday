  
import { showAlert, hideAlert } from './alerts.js';
import { updateSettings } from './updateSettings.js';
const login =async (email, password) => {
    // console.log(email,password);
    try{
        const res = await axios({
        method:'POST',
        url:'http://127.0.0.1:3000/api/v1/users/login',
        data:{
            email,
            password
        },
        withCredentials: true
    });
    if(res.data.status == 'success'){
        showAlert('success','Logged in successfully!');
        window.setTimeout(()=>{
            location.assign('/');
        },1500);
    }
    }catch(err){
         const message = err.response ? err.response.data.message : 'An unexpected error occurred.';
        showAlert('error', message);
    }

};

export const logOut = async() =>{
    try{
        const res = await axios({
            method:'GET',
            url:'http://127.0.0.1:3000/api/v1/users/logOut'
        });
        if((res.data.status='success')) location.reload(true); 
    }catch(err){
        showAlert('error','Error logging out ! Try again');
    }
}







/////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form--login');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const logOutBtn = document.querySelector('.nav_el--logout');
    if (logOutBtn) logOutBtn.addEventListener('click', logOut);
});

document.addEventListener('DOMContentLoaded', () => {
    const userDataForm = document.querySelector('.form-user-data');
    if (userDataForm) {
        userDataForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            updateData(name,email);
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const userPasswordForm = document.querySelector('.form-user-password');
    if (userPasswordForm)
        userPasswordForm.addEventListener('submit', async e => {
          e.preventDefault();
          document.querySelector('.btn--save-password').textContent = 'Updating...';
      
          const passwordCurrent = document.getElementById('password-current').value;
          const password = document.getElementById('password').value;
          const passwordConfirm = document.getElementById('password-confirm').value;
          await updateSettings(
            { passwordCurrent, password, passwordConfirm },
            'password'
          );
      
          document.querySelector('.btn--save-password').textContent = 'Save password';
          document.getElementById('password-current').value = '';
          document.getElementById('password').value = '';
          document.getElementById('password-confirm').value = '';
    });
});


  
