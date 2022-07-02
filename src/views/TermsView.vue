<template>
  <div class="view-terms py-5">
    <div class="container pb-5">
      <h1 class="text-center mb-5">
        <router-link :to="{ name: 'home' }">
          <img class="img-fluid" src="../assets/images/logo.svg" />
        </router-link>
      </h1>
      <h2 class="mb-5">Termos de uso e condições de navegação</h2>

      <p>
        Muito embora a Universidade do Intercâmbio disponibilize conteúdo de
        cunho educacional, relacionado a intercâmbio e estudo no exterior, de
        maneira geral, a empresa não é e não tem a pretensão de ser uma
        instituição de ensino.
      </p>
      <p>
        O conteúdo divulgado em nossos sites é meramente informativo. A
        utilização das informações constantes em nosso(s) site(s) é de inteira
        responsabilidade do usuário, não sendo a Universidade do Intercâmbio
        responsável por qualquer prejuízo ou ausência de resultado que o usuário
        possa ter em decorrência do uso das informações ali constantes.
      </p>
      <p>
        O formato e conteúdo das informações disponibilizadas em nosso(s)
        site(s) poderão ser alterados a qualquer tempo.
      </p>
      <p>
        O conteúdo, marca, dados e outras informações disponibilizadas em
        nosso(s) site(s) são de nossa propriedade exclusiva, a não ser que
        indicado de maneira diversa. A reprodução ou transmissão indevida do
        conteúdo do(s) nosso(s) site(s) sujeitará o usuário à responsabilização
        civil e penal.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.view-terms {
  h5 {
    margin-top: 24px;
  }
  h6 {
    margin-top: 12px;
  }
}
</style>
