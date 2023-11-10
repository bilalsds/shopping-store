<template>
  <div class="pb-5 pt-28">
    <div v-if="userLogin == null" class="flex justify-center">
      <img
        @click="singInWithGoogle"
        class="hover:cursor-pointer py-40"
        src="~/assets/singinwithgoogle.png"
        alt=""
      />
    </div>

    <div v-if="userLogin !== null" class="flex justify-center py-40">
      <div class="flex flex-col gap-10">
        <div class="flex justify-center flex-col gap-10">
          <div class="flex justify-center  ">
            <img class="rounded-full w-40 h-40" :src="userLogin.user_metadata.picture" alt="" />
          </div>
          <div >
            <span class="text-bold font-bold text-gray-500 text-lg py-5">Name : </span> {{ userLogin.user_metadata.full_name }}
          </div>
          <div>
            <span class="text-bold font-bold text-gray-500 text-lg py-5">Email :</span> {{ userLogin.email }}
          </div>
        </div>
        <div>
          <button class="bg-red-500 text-white py-3 px-20 rounded-full" @click="logoutHandler">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser() as any;
const userToken = useState(() => null) as any;



onMounted(() => {
  userToken.value = localStorage.getItem("sb-oqeugynlmzmzthldadxb-auth-token");
});
const userLogin = computed(() => toRaw(user.value))

watch(user, () => {
  if (user.value) {
    localStorage.setItem("user", JSON.stringify(user.value));
  }
});


const singInWithGoogle = async () => {
  // const {data,error} = await client.auth.singInWithOA
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
  });

};
const logoutHandler = async () => {
    const {error} = await client.auth.signOut();

   

    if(!error){
        navigateTo('/')
    } else {
        alert(`Error : ${error}`);
    }
}
</script>

<style scoped></style>
