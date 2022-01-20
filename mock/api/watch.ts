import { MockMethod } from 'vite-plugin-mock';
export default [
  // mock userInfo
  {
    url: '/api/v1/getList',
    timeout: 200,
    method: 'get',
    response: ({ body }) => {
      console.log('body', body);
      return {
        result: '0',
        message: '成功',
        total: '5',
        limit: '8',
        list: [
          {
            vid: '18',
            cover:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5e2962f954a6c.jpg',
            video: 'r3047v30c8p',
            title: 'INES DE LA FRESSANGE  2020春夏系列',
            subtitle: '复古运动 法式牛仔 唯美缪斯',
            share_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5e34305b0d201.jpg',
            recommend_title: 'INES2020春夏系列',
            video_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5e343068ea8cd.jpg',
            video_jump: 'activity/pages/videoList/videoList?channel=weinintuijian',
            create_time: '1579771102',
            status: '1',
            sort: '18',
            share_title: '我在看优衣库INES 2020春夏系列，一起加入边看边买吧！',
            share_friend_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5e3430740b398.jpg',
            type: '50',
            content: '',
            moreList: [{ mid: '22', sort: '1' }],
            video_wnum: '95926',
            video_lnum: '70',
          },
          {
            vid: '17',
            cover:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd7601ece870.jpg',
            video: 'e3024uyz8xm',
            title: '优衣库HEATTECH火热风格之夜',
            subtitle: '穿出火热风格，穿行热力生活',
            share_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd760758d3ee.jpg',
            recommend_title: '优衣库HEATTECH火热风格之夜',
            video_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd76086d53e0.jpg',
            video_jump: 'activity/pages/videoList/videoList?channel=weinintuijian',
            create_time: '1574396920',
            status: '1',
            sort: '17',
            share_title: '我在看优衣库HEATTECH火热风格之夜，一起加入边看边买吧！',
            share_friend_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd761347c098.jpg',
            type: '50',
            content: '',
            moreList: [{ mid: '20', sort: '1' }],
            video_wnum: '33765',
            video_lnum: '33',
          },
          {
            vid: '16',
            cover:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd5f627e5dfa.jpg',
            video: 'e302077xiuk',
            title: 'UNIQLO X Marimekko  2019秋冬系列',
            subtitle: '与家人共享欢乐时光',
            share_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd5f646b8800.jpg',
            recommend_title: 'Marimekko2019系列新品抢先看',
            video_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd5f6579e5ae.jpg',
            video_jump: 'activity/pages/videoList/videoList?channel=weinintuijian',
            create_time: '1574304790',
            status: '1',
            sort: '16',
            share_title: '我在看优衣库Marimekko  2019秋冬系列，一起加入边看边买吧！',
            share_friend_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5dd5f68f889d7.jpg',
            type: '50',
            content: '',
            moreList: [{ mid: '19', sort: '1' }],
            video_wnum: '37970',
            video_lnum: '22',
          },
          {
            vid: '14',
            cover:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d9075d933a68.jpg',
            video: 'p3004sfjgry',
            title: '优无止境，服适人生！为费德勒每一面加油！',
            subtitle: '罗杰费德勒同款，边看边买',
            share_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d985bb3738bc.jpg',
            recommend_title: '罗杰费德勒同款抢先GO',
            video_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d9076d8b91b1.jpg',
            video_jump:
              'pages/index/index?code=ROGER_19FW&utm_source=UQwechat&utm_medium=seetobuyforward&utm_campaign=19FW_Roger&utm_content=recommendation',
            create_time: '1569749662',
            status: '1',
            sort: '14',
            share_title: '我在看优衣库全球品牌大使罗杰费德勒同款，一起加入边看边买吧！',
            share_friend_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d907784e9240.jpg',
            type: '50',
            content: '',
            moreList: [
              { mid: '12', sort: '2' },
              { mid: '17', sort: '1' },
            ],
            video_wnum: '20852',
            video_lnum: '64',
          },
          {
            vid: '13',
            cover:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d81ddd5ee15b.jpg',
            video: 'w0925tmlt0x',
            title: '优衣库100%自然羊毛系列：时尚舒适，穿出自我',
            subtitle: '100%自然羊毛系列，边看边买',
            share_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d80900ec70e9.jpg',
            recommend_title: '秋冬新品抢先GO',
            video_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d80901aa8ebd.jpg',
            video_jump: 'activity/pages/videoList/videoList?channel=weinintuijian',
            create_time: '1568708083',
            status: '1',
            sort: '13',
            share_title: '我在看优衣库100%羊毛系列，一起加入边看边买吧！',
            share_friend_img:
              'https://event.uniqlo.cn/uniqlo_new_cms/public/uploads/watchvideo/5d8090ab94c0e.jpg',
            type: '50',
            content: '',
            moreList: [{ mid: '11', sort: '1' }],
            video_wnum: '48496',
            video_lnum: '65',
          },
        ],
        video_total: '972994',
      };
    },
  },
] as MockMethod[];
