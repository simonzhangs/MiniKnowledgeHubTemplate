# Java 日期时间

java.util 包提供了 Date 类来封装当前的日期和时间。 Date 类提供两个构造函数来实例化 Date 对象。

第一个构造函数使用当前日期和时间来初始化对象。
```
Date( )
```
第二个构造函数接收一个参数，该参数是从1970年1月1日起的毫秒数。
```
Date(long millisec)
```

**获取当前日期时间**

Java中获取当前日期和时间很简单，使用 Date 对象的 toString() 方法来打印当前日期和时间

**日期比较**

Java使用以下三种方法来比较两个日期：

- 使用 getTime() 方法获取两个日期（自1970年1月1日经历的毫秒数值），然后比较这两个值。
- 使用方法 before()，after() 和 equals()。例如，一个月的12号比18号早，则 new Date(99, 2, 12).before(new Date (99, 2, 18)) 返回true。
- 使用 compareTo() 方法，它是由 Comparable 接口定义的，Date 类实现了这个接口。

**使用 SimpleDateFormat 格式化日期**

SimpleDateFormat 是一个以语言环境敏感的方式来格式化和分析日期的类。SimpleDateFormat 允许你选择任何用户自定义日期时间格式来运行。例如：
```
import  java.util.*;
import java.text.*;
 
public class DateDemo {
   public static void main(String args[]) {
 
      Date dNow = new Date( );
      SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
 
      System.out.println("当前时间为: " + ft.format(dNow));
   }
}
```

**日期和时间的格式化编码**

时间模式字符串用来指定时间格式。在此模式中，所有的 ASCII 字母被保留为模式字母，定义如下：

字母	|描述	|示例
---|---|---
G	|纪元标记|	AD
y	|四位年份	|2001
M	|月份	|July or 07
d	|一个月的日期|	10
h	| A.M./P.M. (1~12)格式小时|	12
H	|一天中的小时 (0~23)|	22
m	|分钟数	|30
s	|秒数	|55
S	|毫秒数	|234
E	|星期几	|Tuesday
D	|一年中的日子|	360
F	|一个月中第几周的周几	|2 (second Wed. in July)
w	|一年中第几周	|40
W	|一个月中第几周	|1
a	|A.M./P.M. 标记	|PM
k	|一天中的小时(1~24)	|24
K	| A.M./P.M. (0~11)格式小时	|10
z	|时区	|Eastern Standard Time
'	|文字定界符	|Delimiter
"	|单引号	|`

**使用printf格式化日期**

printf 方法可以很轻松地格式化时间和日期。使用两个字母格式，它以 %t 开头并且以下面表格中的一个字母结尾。

转  换  符|说    明|示    例
---|---|---
c|包括全部日期和时间信息|星期六 十月 27 14:21:20 CST 2007
F|"年-月-日"格式|2007-10-27
D|"月/日/年"格式|10/27/07
r|"HH:MM:SS PM"格式（12时制）|02:25:51 下午
T|"HH:MM:SS"格式（24时制）|14:28:16
R|"HH:MM"格式（24时制）|14:28

**解析字符串为时间**

SimpleDateFormat 类有一些附加的方法，特别是parse()，它试图按照给定的SimpleDateFormat 对象的格式化存储来解析字符串。
```
import java.util.*;
import java.text.*;
  
public class DateDemo {
 
   public static void main(String args[]) {
      SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd"); 
 
      String input = args.length == 0 ? "1818-11-11" : args[0]; 
 
      System.out.print(input + " Parses as "); 
 
      Date t; 
 
      try { 
          t = ft.parse(input); 
          System.out.println(t); 
      } catch (ParseException e) { 
          System.out.println("Unparseable using " + ft); 
      }
   }
}
```

**Java 休眠(sleep)**

sleep()使当前线程进入停滞状态（阻塞当前线程），让出CPU的使用、目的是不让当前线程独自霸占该进程所获的CPU资源，以留一定时间给其他线程执行的机会。

你可以让程序休眠一毫秒的时间或者到您的计算机的寿命长的任意段时间。

**测量时间**

下面的一个例子表明如何测量时间间隔（以毫秒为单位）：

```
import java.util.*;
  
public class DiffDemo {
 
   public static void main(String args[]) {
      try {
         long start = System.currentTimeMillis( );
         System.out.println(new Date( ) + "\n");
         Thread.sleep(5*60*10);
         System.out.println(new Date( ) + "\n");
         long end = System.currentTimeMillis( );
         long diff = end - start;
         System.out.println("Difference is : " + diff);
      } catch (Exception e) {
         System.out.println("Got an exception!");
      }
   }
}
```

**Calendar类**

我们现在已经能够格式化并创建一个日期对象了，但是我们如何才能设置和获取日期数据的特定部分呢，比如说小时，日，或者分钟? 我们又如何在日期的这些部分加上或者减去值呢? 答案是使用Calendar 类。

Calendar类的功能要比Date类强大很多，而且在实现方式上也比Date类要复杂一些。

Calendar类是一个抽象类，在实际使用时实现特定的子类的对象，创建对象的过程对程序员来说是透明的，只需要使用getInstance方法创建即可。

创建一个代表系统当前日期的Calendar对象
```
Calendar c = Calendar.getInstance();//默认是当前日期
```
创建一个指定日期的Calendar对象

使用Calendar类代表特定的时间，需要首先创建一个Calendar的对象，然后再设定该对象中的年月日参数来完成。
```
//创建一个代表2009年6月12日的Calendar对象
Calendar c1 = Calendar.getInstance();
c1.set(2009, 6 - 1, 12);
```

Calendar类对象字段类型

Calendar类中用以下这些常量表示不同的意义，jdk内的很多类其实都是采用的这种思想
常量	|描述
---|---
Calendar.YEAR	|年份
Calendar.MONTH	|月份
Calendar.DATE	|日期
Calendar.DAY_OF_MONTH	|日期，和上面的字段意义完全相同
Calendar.HOUR	|12小时制的小时
Calendar.HOUR_OF_DAY	|24小时制的小时
Calendar.MINUTE	|分钟
Calendar.SECOND	|秒
Calendar.DAY_OF_WEEK	|星期几

GregorianCalendar类

Calendar类实现了公历日历，GregorianCalendar是Calendar类的一个具体实现。

Calendar 的getInstance（）方法返回一个默认用当前的语言环境和时区初始化的GregorianCalendar对象。GregorianCalendar定义了两个字段：AD和BC。这是代表公历定义的两个时代。
