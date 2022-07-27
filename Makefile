influxdb ?= -
ifeq (-,$(influxdb))
  influxdb_host = http://influxdb:8086
else
  influxdb_host = $(influxdb)
endif

resultTag = $(shell basename $(test) .js)_$(shell date +%s)
composeArgs = -f docker/docker-compose.yml --project-name k6_testing --project-directory .

results:
	@open http://localhost:3000/d/XKhgaUpik/k6-results?orgId=1&refresh=5s

start:
	@docker-compose $(composeArgs) up -d 
	@echo ""
	@echo "to see the testing results go to http://localhost:3000/d/XKhgaUpik/k6-results?orgId=1&refresh=5s or run 'make results'"

stop:
	@docker-compose $(composeArgs) down

run:
	@docker-compose $(composeArgs) \
	exec k6 \
    k6 run --address 0.0.0.0:6565 \
	--out influxdb=$(influxdb_host)/k6 \
	--out csv=/results/data_$(resultTag).csv \
	--summary-export /results/summary_$(resultTag).json \
	/$(test)

resume:
	@for host in $(shell echo $(hosts) | tr "," " ") ; do \
    	docker-compose $(composeArgs) exec k6 k6 resume --address $$host:6565; \
	done