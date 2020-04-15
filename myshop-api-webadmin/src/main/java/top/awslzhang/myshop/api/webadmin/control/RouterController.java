package top.awslzhang.myshop.api.webadmin.control;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.RpcContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import top.awslzhang.service.user.api.zuul.VersionService;

@Controller
@RequestMapping("/router")
public class RouterController {
    @Reference(version = "${version.user.v1}")
    private VersionService routerService;

    @Value("${version.user.p1}")
    private String userPort;

    @RequestMapping(value = "user", method = RequestMethod.GET)
    public String userService(String path){
        routerService.info();
        // 本端是否为消费端，这里会返回true
        boolean isConsumerSide = RpcContext.getContext().isConsumerSide();
        if (isConsumerSide){
            // 获取最后一次调用的提供方IP地址
            String serverIP = RpcContext.getContext().getRemoteHost();

            return String.format("redirect:http://%s:%s%s", serverIP, userPort, path);
        }


        return null;
    }
}
