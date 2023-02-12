import toastr from 'toastr';

const popUpMessages = (typeMessage: ToastrType, message: string) => {
  toastr[typeMessage](message);

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    showDuration: 200,
    hideDuration: 100,
    timeOut: 2000,
    extendedTimeOut: 100,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  };
};
export default popUpMessages;
