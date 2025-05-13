#!/bin/bash

TRIGGER_FILE="/var/www/djdg626.com/shared/deploy-trigger.txt"
DEPLOY_SCRIPT="/var/www/djdg626.com/deploy.sh"
LOG_FILE="/var/www/djdg626.com/deploy-monitor.log"

echo "启动部署监控脚本..." >> $LOG_FILE

# 确保部署脚本有执行权限
chmod +x $DEPLOY_SCRIPT

# 无限循环监控触发文件
while true; do
  if [ -f "$TRIGGER_FILE" ]; then
    echo "$(date): 检测到部署触发文件，开始部署..." >> $LOG_FILE

    # 读取触发时间
    TRIGGER_TIME=$(cat "$TRIGGER_FILE")
    echo "触发时间: $TRIGGER_TIME" >> $LOG_FILE

    # 删除触发文件
    rm "$TRIGGER_FILE"

    # 执行部署脚本
    $DEPLOY_SCRIPT >> $LOG_FILE 2>&1

    echo "$(date): 部署完成" >> $LOG_FILE
  fi

  # 休眠5秒
  sleep 5
done