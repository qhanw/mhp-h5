import Image from "next/image";

const src = "";

export default function Report() {
  return (
    <div
      className="mx-auto max-w-[210mm] px-3 prose prose-li:pl-0

    prose-table:border
    prose-table:border-zinc-100
    prose-td:border
    prose-td:border-zinc-100
    prose-td:p-2

    prose-td:align-top
    prose-td:prose-img:m-0


    prose-th:whitespace-nowrap

    prose-th:bg-zinc-200
    prose-th:border
    prose-th:border-zinc-100
    prose-th:p-2

    "
    >
      <h1 className="pt-8 text-center">现场勘察服务报告</h1>
      <ul className="list-none pl-0">
        <li>勘察现场：百度在线网络技术（北京）有限公司‌</li>
        <li>勘察日期：2025-04-29‌ </li>
        <li>服务公司：成都科云智达科技有限公司‌</li>
        <li>勘察人员：张三丰 19912345678</li>
      </ul>
      <div>
        尊敬的客户：
        <div className="indent-8">
          成都科云智达科技有限公司感谢您给予我司为您提供专业服务的机会。我们秉持“预防为主，综合治理”的理念，致力于为贵公司创造安全、卫生的经营环境。本报告基于现场全面勘察结果编制，详细说明发现的虫害问题及专业解决方案。
        </div>
      </div>
      <h2>一、公司资质与服务优势</h2>
      <p className="indent-8">
        成都科云智达科技有限公司是一家专业从事公司专业从事鼠、蟑螂、蚊蝇、白蚁等有害生物防治，公司长期为多家单位提供定期鼠虫害防制服务，为城市各机关、事业单位、图书馆、博物馆、轮船、港口、酒店、商场、农贸市场、宾馆、超市、餐饮、娱乐场所、旅游景区、医院、学校、仓储、食品加工、写字楼、居民及物业小区和个人家居等提供上门服务和技术培训。现我公司建立了一支经过专业技术认证、经验丰富的消杀队伍和售后回访保障体系，并且公司员工都具有很强的实践操作能力与理论知识，保证让每一位客户感受到优质的服务。
      </p>
      <p className="indent-8">
        我们专业的服务可以提高客户在虫害防治方面的整体水平，彻底、安全、环保”是我们追求的目标。我们遵循并倡导“环保控虫”的全新理念，在追求企业发展的同时更注意到对客户和社会的责任。“及时、可靠、细致、全面”是我们一贯坚持的服务准则，确保您在得到我们优质服务的同时，拥有一片洁净的空间。
      </p>
      <p className="indent-8">
        欢迎您来电咨询，我们将诚意派员到贵处详细提供实地检查及评估。希望在与您的接触、跟进过程中，能为贵公司或您本人提供力所能及之建议或帮助。
      </p>
      <h2>二、现场勘察结果</h2>
      <p>
        总体评估：我们的技术团队于2025-04-29日对贵公司位于四川省泸州市江阳区大山坪康平路22号楼1号的现场进行了的全面检查。在现场勘察过程中，发现以下主要问题：
      </p>
      <div className="overflow-auto">
        <table className="table-auto md:table-fixed border-collapse min-w-3xl">
          <thead>
            <tr>
              <th>发现位置</th>
              <th>风险靶标</th>
              <th>风险级别</th>
              <th>风险标签</th>
              <th>潜在风险</th>
              <th>现场照片</th>
              <th>跟进建议</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>厨房</td>
              <td>德国小蠊</td>
              <td>高</td>
              <td>结构设施不足,卫生清洁不足</td>

              <td>食品安全隐患</td>
              <td>
                <Image src={src} width={120} height={120} alt="" />
              </td>
              <td>
                厨房出现老鼠需采取综合治理措施。首先要彻底断绝老鼠的食物来源。
              </td>
            </tr>
            <tr>
              <td>厨房</td>
              <td>德国小蠊</td>
              <td>高</td>
              <td>结构设施不足,卫生清洁不足</td>

              <td>食品安全隐患</td>
              <td>
                <Image src={src} width={120} height={120} alt="" />
              </td>
              <td>
                厨房出现老鼠需采取综合治理措施。首先要彻底断绝老鼠的食物来源。
              </td>
            </tr>
            <tr>
              <td>厨房</td>
              <td>德国小蠊</td>
              <td>高</td>
              <td>结构设施不足,卫生清洁不足</td>

              <td>食品安全隐患</td>
              <td>
                <Image src={src} width={120} height={120} alt="" />
              </td>
              <td>
                厨房出现老鼠需采取综合治理措施。首先要彻底断绝老鼠的食物来源。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>三、靶标虫害防治方案</h2>
      <h3>3.1、白蚁防治方案</h3>
      <p className="indent-8">
        白蚁防治需采取综合治理策略，首先通过专业检查定位蚁巢及活动路径，针对木质结构进行防腐药剂涂刷或热处理破坏栖息环境，同步清除室内外堆放的木质杂物并保持环境干燥；灭治阶段采用环保型饵剂系统诱杀工蚁，辅以钻孔灌注法将药液注入蚁巢核心区域，对墙体裂缝、地基缝隙等通道进行封闭处理；后期定期巡查监测，重点防护电缆、木构件等易损部位，必要时引入白蚁监测装置实现长效防控，严重蚁害建议结合建筑结构改造并寻求专业虫控团队实施系统性治理。
      </p>
      <h3>3.2、老鼠防治方案</h3>
      <p className="indent-8">
        白蚁防治需采取综合治理策略，首先通过专业检查定位蚁巢及活动路径，针对木质结构进行防腐药剂涂刷或热处理破坏栖息环境，同步清除室内外堆放的木质杂物并保持环境干燥；灭治阶段采用环保型饵剂系统诱杀工蚁，辅以钻孔灌注法将药液注入蚁巢核心区域，对墙体裂缝、地基缝隙等通道进行封闭处理；后期定期巡查监测，重点防护电缆、木构件等易损部位，必要时引入白蚁监测装置实现长效防控，严重蚁害建议结合建筑结构改造并寻求专业虫控团队实施系统性治理。
      </p>
      <h2>四、服务时间安排</h2>
      <p>根据贵公司的营业特点，我们建议采取以下服务时段：</p>
      <table>
        <thead>
          <tr>
            <th>服务类型</th>
            <th>周天倾向</th>
            <th>推荐时段</th>
            <th>注意事项</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>常规服务</td>
            <td>工作日</td>
            <td>10:00-11:00；14:00-16:00</td>
            <td>避开用餐高峰时间</td>
          </tr>
          <tr>
            <td>应急处理</td>
            <td>全周</td>
            <td>24小时响应</td>
            <td>加收30%服务费</td>
          </tr>
        </tbody>
      </table>
      <h2>五、服务报价与承诺</h2>
      <p>1、服务报价：</p>
      <table>
        <thead>
          <tr>
            <th>项目</th>
            <th>服务频次</th>
            <th>合计次数</th>
            <th>合计金额</th>
            <th>其他备注</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>白蚁防治</td>
            <td>每月2次</td>
            <td>24</td>
            <td>￥4800</td>
            <td>包含5次免费应急处理；</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>合计</td>
            <td></td>
            <td></td>
            <td>￥8400</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <p>2、服务承诺：</p>
      <ul className="list-none">
        <li>
          严格按照防治方案实施。如有需要根据实际情况调整，会提前和您的管理人员沟通。
        </li>
        <li>
          每次服务后提供图文并茂的服务报告所有使用药剂均附安全数据说明书。
        </li>
        <li>提供虫害防治知识培训。</li>
        <li>如贵方对以上勘察内容和服务建议有任何疑问，欢迎随时联系我们。</li>
      </ul>
      <div className="flex gap-4 items-center relative">
        <ul className="list-none flex-1 pl-0">
          <li className="flex">
            公司地址：
            <div className="flex-1">
              四川省成都市武侯区二环路西一段100号附1号1栋1单元11楼1123号1‌
            </div>
          </li>
          <li>联系电话：028-12345678‌</li>
          <li>联系邮箱：kyzd@qq.com‌</li>
          <li>公司网址：https://www.baidu.com</li>
        </ul>
        <div className="absolute right-0">
          <Image src={src} width={112} height={112} alt="" />
        </div>
      </div>
    </div>
  );
}
