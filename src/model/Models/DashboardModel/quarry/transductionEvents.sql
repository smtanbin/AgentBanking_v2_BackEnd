SELECT
	'CASH WITHDRAWAL'                   AS PARTICULAR,
	COUNT(TRANS_NO)                     AS NO,
	SUM(PAY_AMT)                        AS AMT
FROM
	AGENT_BANKING.GL_TRANS_MST
WHERE
	PARTICULAR = 'Cash Withdrawal' UNION ALL
	SELECT
		'ONLINE CHEQUE PAYMENT'             AS PARTICULAR,
		COUNT(TRANS_NO)                     AS NO,
		SUM(PAY_AMT)                        AS AMT
	FROM
		AGENT_BANKING.GL_TRANS_MST
	WHERE
		PARTICULAR = 'Online Cheque Payment' UNION ALL
		SELECT
			'CHEQUE BOOK FEE'                   AS PARTICULAR,
			COUNT(TRANS_NO)                     AS NO,
			SUM(PAY_AMT)                        AS AMT
		FROM
			AGENT_BANKING.GL_TRANS_MST
		WHERE
			PARTICULAR = 'Cheque Book Fee' UNION ALL
			SELECT
				'CASH DEPOSIT'                      AS PARTICULAR,
				COUNT(TRANS_NO)                     AS NO,
				SUM(PAY_AMT)                        AS AMT
			FROM
				AGENT_BANKING.GL_TRANS_MST
			WHERE
				PARTICULAR = 'Cash Deposit' UNION ALL
				SELECT
					'OUTWARD BEFTN'                     AS PARTICULAR,
					COUNT(TRANS_NO)                     AS NO,
					SUM(PAY_AMT)                        AS AMT
				FROM
					AGENT_BANKING.GL_TRANS_MST
				WHERE
					PARTICULAR = 'Outward BEFTN' UNION ALL
					SELECT
						'INWARD BEFTN'                      AS PARTICULAR,
						COUNT(TRANS_NO)                     AS NO,
						SUM(PAY_AMT)                        AS AMT
					FROM
						AGENT_BANKING.GL_TRANS_MST
					WHERE
						PARTICULAR = 'Inward BEFTN' UNION ALL
						SELECT
							'UTILITY PAYMENT'                   AS PARTICULAR,
							COUNT(TRANS_NO)                     AS NO,
							SUM(PAY_AMT)                        AS AMT
						FROM
							AGENT_BANKING.GL_TRANS_MST
						WHERE
							PARTICULAR = 'Utility Payment' UNION ALL
							SELECT
								'INSTANT INWARD FOREIGN REMITTANCE' AS PARTICULAR,
								COUNT(TRANS_NO)                     AS NO,
								SUM(PAY_AMT)                        AS AMT
							FROM
								AGENT_BANKING.GL_TRANS_MST
							WHERE
								PARTICULAR = 'Instant Inward Foreign Remittance' UNION ALL
								SELECT
									'ACCOUNT OPENED'                    AS EVENT,
									COUNT(MPHONE)                       AS NO,
									SUM(BALANCE_M)                      AS AMT
								FROM
									AGENT_BANKING.REGINFO
								WHERE
									TRUNC(REG_DATE) = TRUNC(SYSDATE)
									AND STATUS != 'R' UNION ALL
									SELECT
										'REMITTANCE'                        AS EVENT,
										COUNT(REM_ID)                       AS NO,
										SUM(SEN_REM_AMT)                    AS AMT
									FROM
										AGENT_BANKING.REMITTANCE_INFO
									WHERE
										TRUNC(AUTHO_DATE) = TRUNC(SYSDATE)
										AND STATUS != 'R'