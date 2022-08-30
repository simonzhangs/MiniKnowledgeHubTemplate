## go中并发获取token代码片段

获取token的问题，token有2个小时的时效，因此一般会将token存在redis中。现在存的一个问题，是多个线程同时访问token，如果不加设计的话，会多次访问token。

```
package push

import (
	"sync"
	"context"
)

var tokenLock sync.Mutex 
// 推送
func PushNotice(ctx context.Context) {
    accessToken := GetAppAccessToken() // 从redis中获取app token
	if accessToken == "" {
		tokenLock.Lock()
		// 再一次调用redis
		accessToken = GetAppAccessToken()
		if accessToken == "" {
			authResp, err := DoGetAccessToken(ctx)
			if err != nil {
				tokenLock.Unlock()
				return err
			}
			accessToken = authResp.Data.AuthToken
			StoreAppAccessToken(accessToken) 
			tokenLock.Unlock()
		} else {
			tokenLock.Unlock()
		}
	}
	
	// 使用该token调用第三方服务
	rsp := GetPushService(accessToken) // 调用具体服务
	
}
```
