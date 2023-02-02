const loginHTML = (page: string) => `<div class="login">
  <form action="" onsubmit="return false" class="login__form">
    <fieldset>
      <legend class="login__form-tittle">Log in</legend>
      <label for="email" class="login__form-label">Email</label>
      <input type="email" required class="login__form-email" id="email" name="email" placeholder="example@gmail.com">
      <label for="password" class="login__form-label">Password</label>
      <input type="password" required class="login__form-password" name="password" id="password" placeholder="********">
      <button type="submit" class="login__form-submit">Log in</button>
    </fieldset>
  </form>
  <p class="login__message">Don't have an account? <a href="#" class="login__message-link">Sign up</a></p>
</div>
`;

export default loginHTML;
