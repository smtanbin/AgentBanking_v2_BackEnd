SELECT USERNAME,ROLEID FROM AGENT_BANKING.USER_INFO u WHERE u.PSTATUS = 'Y' AND (u.USTATUS = 'U' OR u.USTATUS IS NULL) AND u.USERID = UPPER(:username)