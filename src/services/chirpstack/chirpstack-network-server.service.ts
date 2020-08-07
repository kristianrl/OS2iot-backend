import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { GenericChirpstackConfigurationService } from "./generic-chirpstack-configuration.service";
import { CreateNetworkServerDto } from "@dto/create-network-server.dto";
import { ListAllNetworkServerReponseDto } from "@dto/list-all-network-server-response.dto";
import { UpdateNetworkServerDto } from "@dto/update-network-server.dto";
import { DeleteResponseDto } from "@dto/delete-application-response.dto";

@Injectable()
export class ChirpstackSetupNetworkServerService
    extends GenericChirpstackConfigurationService
    implements OnModuleInit {
    async onModuleInit(): Promise<void> {
        if ((await this.getNetworkServerCount()) < 1) {
            this.postNetworkServer(this.setupData());
        }
    }

    public async postNetworkServer(
        data: string
    ): Promise<CreateNetworkServerDto> {
        return await this.post("network-servers", data);
    }
    public async putNetworkServer(
        data: string,
        id: number
    ): Promise<UpdateNetworkServerDto> {
        return await this.put("network-servers", data, id);
    }
    public async deleteNetworkServer(id: number): Promise<DeleteResponseDto> {
        Logger.error("Delete " + id);
        return await this.delete("network-servers", id);
    }
    public async getNetworkServer(
        limit?: number,
        offset?: number
    ): Promise<ListAllNetworkServerReponseDto> {
        const result: ListAllNetworkServerReponseDto = await this.getAll(
            "network-servers",
            limit,
            offset
        );
        return result;
    }
    public async getNetworkServerCount(): Promise<number> {
        const result: ListAllNetworkServerReponseDto = await this.getAll(
            "network-servers",
            0,
            1000
        );
        return result.totalCount;
    }

    setupData(): string {
        const chirpstackNetworkServerName =
            "os2iot-docker_chirpstack-network-server_1:8000";

        const createNetworkServerDto: CreateNetworkServerDto = {
            name: chirpstackNetworkServerName,
            server: chirpstackNetworkServerName,
            /*
            caCert: "",
            gatewayDiscoveryDR: 0,
            gatewayDiscoveryEnabled: false,
            gatewayDiscoveryInterval: 0,
            gatewayDiscoveryTXFrequency: 0,
            routingProfileCACert: "",
            routingProfileTLSCert: "",
            routingProfileTLSKey: "",
            tlsCert: "",
            tlsKey: "",
            */
        };
        const data: string = //TODO: skriv om til at bruge en DTO
            '{"networkServer":' + JSON.stringify(createNetworkServerDto) + "}";

        return data;
    }
}
