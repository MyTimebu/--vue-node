<template>
  <div id="app">
    <router-view />
    <!-- <canvas class="mb-4" id="live2d" width="300" height="300"></canvas> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  mounted(){},
  methods:{
    test(){
      var apiURL = "https://live2d.fghrsh.net/api", state = 0,
        modelId = localStorage.getItem("modelId"),
        modelTexturesId = localStorage.getItem("modelTexturesId");
      if (modelId == null) {
        modelId = 1;
        modelTexturesId = 53;
        // modelId = 0;
        // modelTexturesId = 90;
        
      }
      console.log(modelId, modelTexturesId)
      loadModel(modelId, modelTexturesId,apiURL);

      function loadModel(modelId, modelTexturesId,apiURL) {
        console.log(modelId, modelTexturesId)
        localStorage.setItem("modelId", modelId);
        if (modelTexturesId === undefined) modelTexturesId = 0;
        localStorage.setItem("modelTexturesId", modelTexturesId);
        loadlive2d("live2d", `${apiURL}/get/?id=${modelId}-${modelTexturesId}`, null);
        console.log("live2d", `模型 ${modelId}-${modelTexturesId} 加载完成`);
        setTimeout(function() {
          $("#cover").css("bottom", "80%");
          state = 2;
        }, 2000);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mb-4{
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
