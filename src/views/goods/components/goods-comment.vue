<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p><span> {{evaluateList.salesCount}} </span><span>人购买</span></p>
        <p><span> {{evaluateList.praisePercent}} </span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a href="javascript:;" @click="screen('tag',null)" :class="{active:reqParams.tag===null}">全部评价({{evaluateList.evaluateCount}})</a>
          <a href="javascript:;" v-for="item,i in evaluateList.tags" :key="i" @click="screen('tag',item.title)" :class="{active:reqParams.tag===item.title}">{{item.title}}（{{item.tagCount}}）</a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" @click="screen('sortField',null)" :class="{active:reqParams.sortField===null}">默认</a>
      <a href="javascript:;" @click="screen('sortField','createTime')" :class="{active:reqParams.sortField==='createTime'}">最新</a>
      <a href="javascript:;" @click="screen('sortField','praiseCount')" :class="{active:reqParams.sortField==='praiseCount'}">最热</a>
    </div>
    <div class="list">
      <div class="item" v-for="item in evaluateList.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span> {{item.member.nickname}} </span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01" v-for="i in item.score" :key="i"></i>
            <i class="iconfont icon-wjx02" v-for='star in 5 - item.score' :key='star'></i>
            <span class="attr" v-for="i,n in item.orderInfo.specs" :key="n">
              {{i.name+'：'+i.nameValue}}
            </span>
          </div>
          <div class="text">{{item.content}}</div>
          <GoodsCommentImage v-if="item.pictures.length>0" :pictures="item.pictures" />
          <div class="time">
            <span> {{item.createTime}} </span>
            <span class="zan"><i class="iconfont icon-dianzan"></i> {{item.praiseCount}} </span>
          </div>
        </div>
      </div>
    </div>
    <XtxPagination :pages="reqParams.pages" :page="reqParams.page" @page-change="pageChange"></XtxPagination>
  </div>
</template>

<script>
import { inject, reactive } from 'vue'
import { getGoodsPageAPI } from '@/api'
import GoodsCommentImage from './goods-comment-image.vue'

// 调接口方法
const getPage = (reqParams, evaluateList) => {
  // 评价分页数据
  getGoodsPageAPI(reqParams).then(({ result }) => {
    setnickname(result.items)
    reqParams.pages = result.pages
    // 所有数据合并到一起
    evaluateList.value.items = result.items
  })
}
// 评论用户昵称显示修改
const setnickname = arr => {
  arr.forEach(item => {
    // const str = ref('')
    // for (let i = 1; i <= name.length - 2; i++) {
    //   str.value += '*'
    // }
    // item.member.nickname = name.replace(name.substr(1, name.length - 2), str.value)
    const name = item.member.nickname
    item.member.nickname = name.charAt(0) + '****' + name.charAt(name.length - 1)
  })
}

export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage
  },
  setup () {
    // 依赖注入
    const evaluateList = inject('commentList')
    // 筛选条件准备
    const reqParams = reactive({
      // 商品id
      id: evaluateList.value.id,
      // 当前页码
      page: 1,
      // 每页的条数
      pageSize: 10,
      // 是否有图片
      hasPicture: null,
      // 筛选条件
      tag: null,
      // 排序的字段
      sortField: null
    })
    // 调用方法
    getPage(reqParams, evaluateList)
    // 点击事件修改筛选条件
    const screen = (key, val) => {
      val === '有图'
        ? reqParams.hasPicture = true
        : reqParams.hasPicture = null
      reqParams[key] = val
      reqParams.page = 1
      getPage(reqParams, evaluateList)
    }
    // 当页码改变
    const pageChange = e => {
      // 接收当前页码，改变页码值，调用接口方法
      reqParams.page = e
      getPage(reqParams, evaluateList)
      // 将滚动条跳到第一条评价
      setTimeout(() => {
        window.scrollTo(0, 1200)
      })
    }

    return { evaluateList, screen, reqParams, pageChange }
  }
}
</script>

<style scoped lang="less">
.goods-comment {
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
.head {
  display: flex;
  padding: 30px 0;
  .data {
    width: 340px;
    display: flex;
    padding: 20px;
    p {
      flex: 1;
      text-align: center;
      span {
        display: block;
        &:first-child {
          font-size: 32px;
          color: @priceColor;
        }
        &:last-child {
          color: #999;
        }
      }
    }
  }
  .tags {
    flex: 1;
    display: flex;
    border-left: 1px solid #f5f5f5;
    .dt {
      font-weight: bold;
      width: 100px;
      text-align: right;
      line-height: 42px;
    }
    .dd {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      > a {
        width: 132px;
        height: 42px;
        margin-left: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        border: 1px solid #e4e4e4;
        background: #f5f5f5;
        color: #999;
        text-align: center;
        line-height: 40px;
        &:hover {
          border-color: @xtxColor;
          background: lighten(@xtxColor, 50%);
          color: @xtxColor;
        }
        &.active {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
      }
    }
  }
}
</style>
