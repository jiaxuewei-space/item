<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="info" style="width: 600px" label-width="80px" ref="form"  :rules="rules">
    <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="info.first_cateid" @change="cateChange">
            <el-option v-for="item in cateone" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>   
    </el-form-item>
    <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="info.second_cateid">
             <el-option v-for="item in catetwo" :key="item.id" :label="item.catename"  :value="item.id"></el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="商品名称" prop="goodsname">
      <el-input placeholder="请输入商品管理名称" v-model="info.goodsname"></el-input>
    </el-form-item>

    <el-form-item label="商品价格" prop="price">
      <el-input type="number" placeholder="请输入商品价格" v-model="info.price"></el-input>
    </el-form-item>

    <el-form-item label="市场价格" prop="market_price">
      <el-input type="number" placeholder="请输入市场价格" v-model="info.market_price"></el-input>
    </el-form-item>

    <el-form-item label="图片" v-show="info.pid!=0">
        <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="fileChange" :file-list="fileList">
          <i slot="default" class="el-icon-plus"></i>

          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="preview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-upload-list__item-delete" @click="imgdel">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>

        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>

      </el-form-item> 

      <el-form-item label="商品规格">
        <el-select v-model="info.specsid" @change="specsChange">
          <el-option v-for="specsitem of specsarr" :key="specsitem.id" :value="specsitem.id" :label="specsitem.specsname"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性">
        <el-select v-model="info.specsattr" multiple popper-class="customSelect">
          <el-option v-for="(attritem,index) of specsattrs" :key="index" :value="attritem" :label="attritem"></el-option>
        </el-select>
      </el-form-item>

       <el-form-item label="商品描述">
        <div id="desc"></div>
      </el-form-item>

      <el-form-item label="是否新品">
        <el-switch v-model="info.isnew" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item label="是否热卖">
        <el-switch v-model="info.ishot" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="info.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wang from 'wangeditor'
export default {
  data() {
    return {
      editor:null,
      tip: "添加",
      dialogVisible:false,
      dialogImageUrl:'',
      info: {
        first_cateid:'',
        second_cateid:'',
        goodsname: "",
        price:'',
        market_price:'',
        description:'',
        specsid:'',
        specsattr:[],
        img: "",
        isnew:1,
        ishot:1,
        status: 1,
        
      },
      rules: {
        first_cateid:[
          {required:true,message:'请选择一级分类'}
        ],
        second_cateid:[
          {required:true,message:'请选择二级分类'}
        ],
      },
      cateone:[],
      catetwo:[],
      specsarr:[],
      specsattrs:[],
      fileList:[],
    };
  },
  mounted() {
    this.editor = new wang('#desc')
    this.editor.config.uploadImgShowBase64 = true
    this.editor.create();
      //获取一节分类
      this.axios.get('/api/catelist?pid=0').then(res=>{
          this.cateone = res.data.list;
      })
      this.axios.get('/api/specslist').then(res=>{
          this.specsarr = res.data.list;
      })
      if(this.$route.params.id){
        this.tip = '编辑'
        this.axios({
          url:'/api/goodsinfo',
          params:{id:this.$route.params.id}
        }).then(res=>{
          if(res.data.code == 200){
            this.info = res.data.list
            //设置页面上的内容
            //根据一级分类获取二级分类
            this.cateChange(this.info.first_cateid)
            //根据商品规格获取商品属性
            this.specsChange(this.info.specsid)
            //商品规格属性可以多选，所以要把它的数据类型改为数组
            this.info.specsattr = this.info.specsattr.split(',')
            //设置富文本编辑器的内容
            this.editor.txt.html(this.info.description)
            //设置商品图片
            this.fileList = [{url:this.info.img}]
          }
        })
      }

   
  },
  methods: {
    preview(file){
      this.dialogVisible = true
      this.dialogImageUrl = file.url;
    },
    imgdel(){
      this.fileList = []
    },
    fileChange(file){
      this.info.img = file.raw
    },
    cateChange(n){
      this.axios.get('/api/catelist?pid=' +n).then(res=>{
          this.catetwo = res.data.list;
      })
      },

      specsChange(n){
        this.axios.get('/api/specsinfo?id='+n).then(res=>{
          this.specsattrs = res.data.list[0].attrs
        })
      },
    submit() {   
      //获取富文本编辑器的内容 
      this.info.description = this.editor.txt.html(); 

      var url = '/api/goodsadd'
      if(this.$route.params.id){
        url = '/api/goodsedit'
        this.info.id = this.$route.params.id
      }
      var data = new FormData();
      for(let i in this.info){
        data.append(i,this.info[i])
      }
      this.$refs.form.validate(val=>{
        if(val){
          this.axios({url,method:'post',data,}).then(res=>{
            if(res.data.code===200){
              this.$router.push('/goods')
            }
          })
        }
      })

    },
  },
};
</script>

<style scoped>
.attritem {
  display: flex;
}

</style>